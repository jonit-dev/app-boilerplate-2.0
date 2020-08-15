import { TaskStatus } from '../task.model';

export class CreateClassDto {
  title: string;
  description: string;
  status: TaskStatus;
}

