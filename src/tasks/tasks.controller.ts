import { Body, Controller, Param, ParseIntPipe, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Delete, Get, Patch, Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RestrictUpdateKeys } from 'pipes/RestrictUpdateKeys.pipe';

import { ColorTemplate, CustomLogger } from '../../loggers/CustomLogger';
import { GetUser } from '../auth/auth.decorators';
import { User } from '../auth/user.entity';
import { TaskStatusValidationPipe } from './pipes/taskStatusValidation.pipe';
import { TaskCreateDTO, TaskGetFilterDTO, TaskUpdateDTO } from './task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';


@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

  private logger = new CustomLogger('Tasks')

  constructor(private tasksService: TasksService) { }


  @Get()
  getTasks(
    @GetUser() user: User,
    @Query(ValidationPipe) filterDto?: TaskGetFilterDTO,
  ): Promise<Task[]> {
    this.logger.customLog(`User: ${user.email} getting all tasks. filterDto: ${JSON.stringify(filterDto)}`)
    return this.tasksService.getTasks(user, filterDto)
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user)
  }

  @Post()
  @UsePipes(ValidationPipe)

  createTask(@Body() createTaskDto: TaskCreateDTO,
    @GetUser() user: User): Promise<Task> {
    this.logger.customLog(`User: ${user.email} is creating a new task. CreateTaskDto: ${JSON.stringify(createTaskDto)}`, ColorTemplate.Blue)
    return this.tasksService.createTask(createTaskDto, user)
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.customLog(`User: ${user.email} is deleting a task. Id: ${id}`)
    return this.tasksService.deleteTask(id, user)
  }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): ITask {
  //   return this.tasksService.deleteTask(id)
  // }

  @Patch('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body(RestrictUpdateKeys, TaskStatusValidationPipe) updateTaskDto: TaskUpdateDTO,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.customLog(`User: ${user.email} is updating a task. updateTaskDto: ${JSON.stringify(updateTaskDto)}`)
    return this.tasksService.updateTask(id, updateTaskDto, user)
  }
}
