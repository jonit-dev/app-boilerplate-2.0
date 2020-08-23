import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TaskCreateDTO, TaskGetFilterDTO } from './task.dto';
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

  async getAllTasks(filterDto?: TaskGetFilterDTO): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDto)
  }

  async deleteTask(id: number) {
    return await this.taskRepository.deleteTask(id)
  }

  // private tasks: ITask[] = [
  //   { id: uuidv4(), title: "Hello world", description: "hi", status: TaskStatus.Open }
  // ]

  // getAllTasks(): ITask[] {

  //   return this.tasks
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): ITask[] {

  //   const { status, search } = filterDto


  //   let tasks = this.getAllTasks()

  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status)
  //   }

  //   if (search) {
  //     tasks = tasks.filter((task => task.title.includes(search) || task.description.includes(search)))
  //   }


  //   return tasks
  // }



  // createTask(createTaskDto: CreateTaskDto): ITask {


  //   const newTask: ITask = {
  //     id: uuidv4(),
  //     ...createTaskDto
  //   }

  //   this.tasks.push(newTask)

  //   return newTask
  // }

  // deleteTask(id: string): ITask {
  //   const deletedTask = this.tasks.find((task) => task.id === id)

  //   if (!deletedTask) {
  //     throw new NotFoundException(`Task IF ${id} not found for deletion`)
  //   }


  //   this.tasks = this.tasks.filter((task) => task.id !== deletedTask.id)

  //   return deletedTask
  // }

  // updateTask(id: string, updateClassDto: UpdateClassDto): ITask {

  //   let updatedTask = this.getTaskById(id)

  //   updatedTask = {
  //     ...updatedTask,
  //     ...updateClassDto
  //   }

  //   this.tasks = this.tasks.map((task) => {
  //     if (task.id === updatedTask.id) {
  //       task = updatedTask
  //     }
  //     return task
  //   })


  //   return updatedTask;
  // }

}
