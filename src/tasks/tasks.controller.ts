import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreateClassDto } from './dto/create-task.dto';
import { ITask } from './task.model';
import { TasksService } from './tasks.service';


@Controller('tasks')
export class TasksController {

  constructor(private tasksService: TasksService) { }

  @Get()
  getAllTasks(): ITask[] {
    return this.tasksService.getAllTasks()
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): ITask {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  createTask(@Body() createTaskDto: CreateClassDto): ITask {

    return this.tasksService.createTask(createTaskDto)
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): ITask {
    return this.tasksService.deleteTask(id)
  }
}
