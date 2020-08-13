import { TaskStatus } from '../task.model';

export class CreateClassDto {
  title: string;
  description: string;
}

export class UpdateClassDto extends CreateClassDto {
  status: TaskStatus
}