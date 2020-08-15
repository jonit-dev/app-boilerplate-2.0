import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { CreateClassDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateClassDto } from './dto/update-task.dto';
import { ITask } from './task.model';
import { TasksService } from './tasks.service';


@Controller('tasks')
export class TasksController {

  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): ITask[] {

    if (!Object.keys(filterDto).length) {
      return this.tasksService.getAllTasks()
    }

    return this.tasksService.getTasksWithFilters(filterDto)

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

  @Patch('/:id')
  updateTask(
    @Param('id') id: string,
    @Body() updateClassDto: UpdateClassDto
  ): ITask {
    return this.tasksService.updateTask(id, updateClassDto)
  }
}
