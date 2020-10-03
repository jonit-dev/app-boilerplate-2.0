import { EntityRepository, Repository } from 'typeorm';

import { TaskCreateDTO, TaskGetFilterDTO, TaskUpdateDTO } from './task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.types';


@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async createTask(createTaskDto: TaskCreateDTO): Promise<Task> {
    const { title, description } = createTaskDto

    const task = new Task()
    task.title = title;
    task.description = description;
    task.status = TaskStatus.Open;
    await task.save()

    return task
  }

  async getTasks(filterDto?: TaskGetFilterDTO) {

    const { status, search } = filterDto

    const query = this.createQueryBuilder('task')

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere('(task.title ILIKE :search OR task.description ILIKE :search)', { search: `%${search}%` })
    }



    const tasks = await query.getMany()

    return tasks
  }

  async deleteTask(id: number) {
    return await Task.delete({ id })
  }

  async updateTask(id: number, taskUpdateDto: TaskUpdateDTO) {
    return await Task.update({ id }, taskUpdateDto)
  }
}