import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TaskCreateDTO, TaskGetFilterDTO, TaskUpdateDTO } from './task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository) {
  }

  async getTaskById(id: number) {
    const found = await this.taskRepository.findOne(id)
    console.log(found);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`)
    }

    return found
  }

  async createTask(createTaskDto: TaskCreateDTO): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto)
  }

  async getTasks(filterDto?: TaskGetFilterDTO): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDto)
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.deleteTask(id)

    if (!result.affected) {
      throw new NotFoundException(`Task with ID ${id} not found`)
    }
    console.log('Task deleted...');

    console.log(result);


  }

  async updateTask(id: number, taskUpdateDto: TaskUpdateDTO): Promise<void> {
    const result = await this.taskRepository.updateTask(id, taskUpdateDto)

    console.log(result);

    if (!result.affected) {
      throw new NotFoundException(`Task with Id ${id} not found`)
    }



  }

}
