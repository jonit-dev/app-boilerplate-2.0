import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { TaskStatus } from './task.types';

export class TaskCreateDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  status: TaskStatus;
}


export class TaskGetFilterDTO {
  @IsOptional()
  @IsString()
  @IsIn([TaskStatus.Open, TaskStatus.Done, TaskStatus.InProgress])
  status: TaskStatus;

  @IsOptional()
  // @IsNotEmpty()
  @IsString()
  search: string;
}

export class UpdateClassDto extends TaskCreateDTO {

}