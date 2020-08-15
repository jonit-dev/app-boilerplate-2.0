import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateClassDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateClassDto } from './dto/update-task.dto';
import { ITask, TaskStatus } from './task.model';

@Injectable()
export class TasksService {

  private tasks: ITask[] = [
    { id: uuidv4(), title: "Hello world", description: "hi", status: TaskStatus.Open }
  ]

  getAllTasks(): ITask[] {

    return this.tasks
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): ITask[] {

    const { status, search } = filterDto


    let tasks = this.getAllTasks()

    if (status) {
      tasks = tasks.filter(task => task.status === status)
    }

    if (search) {
      tasks = tasks.filter((task => task.title.includes(search) || task.description.includes(search)))
    }


    return tasks
  }

  getTaskById(id: string): ITask {
    return this.tasks.find((task) => task.id === id)
  }

  createTask(createTaskDto: CreateClassDto): ITask {


    const newTask: ITask = {
      id: uuidv4(),
      ...createTaskDto
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
