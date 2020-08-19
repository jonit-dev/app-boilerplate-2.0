import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateClassDto } from './dto/update-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { ITask } from './task.model';
import { TasksService } from './tasks.service';


@Controller('tasks')
export class TasksController {

  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): ITask[] {

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
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): ITask {

    return this.tasksService.createTask(createTaskDto)
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): ITask {
    return this.tasksService.deleteTask(id)
  }

  @Patch('/:id')
  updateTask(
    @Param('id') id: string,
    @Body(TaskStatusValidationPipe) updateClassDto: UpdateClassDto
  ): ITask {
    console.log('updating task');
    console.log(id);
    return this.tasksService.updateTask(id, updateClassDto)
  }
}
