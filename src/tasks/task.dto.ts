import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { TaskStatus } from './task.types';

export class TaskCreateDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
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

export class TaskUpdateDTO {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  description: string;

  @IsOptional()
  @IsIn([TaskStatus.Open, TaskStatus.Done, TaskStatus.InProgress])
  status: TaskStatus;
}
