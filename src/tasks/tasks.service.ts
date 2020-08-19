import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateTaskDto } from './dto/create-task.dto';
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
    const found = this.tasks.find((task) => task.id === id)

    console.log('fetching task');
    console.log(found);

    if (!found) {
      throw new NotFoundException(`Task with Id ${id} not found!`) // this will be caught by NestJS
    }

    return found


  }

  createTask(createTaskDto: CreateTaskDto): ITask {


    const newTask: ITask = {
      id: uuidv4(),
      ...createTaskDto
    }

    this.tasks.push(newTask)

    return newTask
  }

  deleteTask(id: string): ITask {
    const deletedTask = this.tasks.find((task) => task.id === id)

    if (!deletedTask) {
      throw new NotFoundException(`Task IF ${id} not found for deletion`)
    }


    this.tasks = this.tasks.filter((task) => task.id !== deletedTask.id)

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
