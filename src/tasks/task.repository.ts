import { DeleteResult, EntityRepository, Repository, UpdateResult } from 'typeorm';

import { User } from '../auth/user.entity';
import { TaskCreateDTO, TaskGetFilterDTO, TaskUpdateDTO } from './task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.types';


@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async createTask(createTaskDto: TaskCreateDTO, user: User): Promise<Task> {
    const { title, description } = createTaskDto

    const task = new Task()
    task.title = title;
    task.description = description;
    task.status = TaskStatus.Open;
    task.user = user;
    await task.save()



    return task
  }

  async getTasks(user: User, filterDto?: TaskGetFilterDTO): Promise<Task[]> {

    const { status, search } = filterDto

    const query = this.createQueryBuilder('task')

    query.where('task.userId = :userId', { userId: user.id })

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere('(task.title ILIKE :search OR task.description ILIKE :search)', { search: `%${search}%` })
    }

    const tasks = await query.getMany()

    return tasks
  }

  async deleteTask(id: number, user: User): Promise<DeleteResult> {
    return await Task.delete({ id, userId: user.id })
  }

  async updateTask(id: number, taskUpdateDto: TaskUpdateDTO, user: User): Promise<UpdateResult> {
    return await Task.update({ id, userId: user.id }, taskUpdateDto)
  }
}