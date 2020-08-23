import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Like, Repository } from 'typeorm';

import { TaskCreateDTO, TaskGetFilterDTO } from './task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.types';


@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async createTask(createTaskDto: TaskCreateDTO): Promise<Task> {
    const { title, description } = createTaskDto

    const task = new Task()
    task.title = title,
      task.description = description;
    task.status = TaskStatus.Open;
    await task.save()

    return task
  }

  async getTasks(filterDto?: TaskGetFilterDTO) {

    const { status, search } = filterDto

    let query = {}


    if (status) {
      query = {
        ...query,
        ...{
          status: filterDto.status
        }
      }
    }
    if (search) {
      query = {
        ...query,
        ...{
          title: Like(`%${search}%`)
        }
      }
    }

    console.log(query);

    const tasks = await Task.find(query)

    return tasks
  }

  async deleteTask(id: number) {

    const deleteTask = await Task.delete({ id })

    if (!deleteTask) {
      throw new NotFoundException(`Task ID ${id} not found!`)
    }

    return {
      status: "success",
      message: `Task ID ${id} deleted successfully!`
    };

  }
}