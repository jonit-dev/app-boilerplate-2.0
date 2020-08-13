import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateClassDto, UpdateClassDto } from './dto/task.dto';
import { ITask, TaskStatus } from './task.model';

@Injectable()
export class TasksService {

  private tasks: ITask[] = [
    { id: uuidv4(), title: "Hello world", description: "hi", status: TaskStatus.Open }
  ]

  getAllTasks(): ITask[] {
    return this.tasks
  }

  getTaskById(id: string): ITask {
    return this.tasks.find((task) => task.id === id)
  }

  createTask(createTaskDto: CreateClassDto): ITask {

    const { title, description } = createTaskDto

    const newTask: ITask = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.Open
    }

    this.tasks.push(newTask)

    return newTask
  }

  deleteTask(id: string): ITask {
    const deletedTask = this.tasks.find((task) => task.id === id)
    this.tasks = this.tasks.filter((task) => task.id !== id)

    return deletedTask
  }

  updateTask(id: string, updateClassDto: UpdateClassDto): ITask {

    let updatedTask = this.getTaskById(id)

    updatedTask = {
      ...updatedTask,
      ...updateClassDto
    }

    this.tasks = this.tasks.map((task) => {
      if (task.id === updatedTask.id) {
        task = updatedTask
      }
      return task
    })


    return updatedTask;
  }




}
