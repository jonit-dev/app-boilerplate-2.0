import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../auth/user.entity';
import { TaskCreateDTO, TaskGetFilterDTO, TaskUpdateDTO } from './task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository) {
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      id,
      userId: user.id
    })

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`)
    }

    return found
  }

  async createTask(createTaskDto: TaskCreateDTO, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user)
  }

  async getTasks(user: User, filterDto?: TaskGetFilterDTO): Promise<Task[]> {
    return await this.taskRepository.getTasks(user, filterDto)
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.deleteTask(id, user)

    if (!result.affected) {
      throw new NotFoundException(`Task with ID ${id} not found`)
    }
    console.log('Task deleted...');

    console.log(result);
  }

  async updateTask(id: number, taskUpdateDto: TaskUpdateDTO, user: User): Promise<void> {
    const result = await this.taskRepository.updateTask(id, taskUpdateDto, user)


    if (!result.affected) {
      throw new NotFoundException(`Task with Id ${id} not found`)
    }



  }

}
