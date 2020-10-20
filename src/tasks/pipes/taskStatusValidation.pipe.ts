import { BadRequestException, PipeTransform } from '@nestjs/common';

import { TaskStatus } from '../task.types';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.Open,
    TaskStatus.InProgress,
    TaskStatus.Done,
  ];

  transform(value) {
    // Check if the task status is under our enum
    if (value.status && !this.isStatusValid(value.status)) {
      throw new BadRequestException(`${value.status} is an invalid status!`);
    }

    return value;
  }

  private isStatusValid(status) {
    return this.allowedStatuses.includes(status);
  }
}
