import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
  @IsOptional()
  @IsString()
  @IsIn([TaskStatus.Open, TaskStatus.Done, TaskStatus.InProgress])
  status: TaskStatus;

  @IsNotEmpty()
  @IsString()
  search: string;
}