import { Body, Controller, Param, ParseIntPipe, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Delete, Get, Patch, Post } from '@nestjs/common/decorators/http/request-mapping.decorator';

import { TaskStatusValidationPipe } from './pipes/taskStatusValidation.pipe';
import { TaskCreateDTO, TaskGetFilterDTO, TaskUpdateDTO } from './task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';


@Controller('tasks')
export class TasksController {

  constructor(private tasksService: TasksService) { }


  @Get()
  getTasks(@Query(ValidationPipe) filterDto?: TaskGetFilterDTO): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto)
  }

  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): ITask[] {

  //   if (!Object.keys(filterDto).length) {
  //     return this.tasksService.getAllTasks()
  //   }

  //   return this.tasksService.getTasksWithFilters(filterDto)

  // }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: TaskCreateDTO): Promise<Task> {
    return this.tasksService.createTask(createTaskDto)
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTask(id)
  }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): ITask {
  //   return this.tasksService.deleteTask(id)
  // }

  @Patch('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body(TaskStatusValidationPipe) updateClassDto: TaskUpdateDTO
  ): Promise<void> {
    return this.tasksService.updateTask(id, updateClassDto)
  }
}
