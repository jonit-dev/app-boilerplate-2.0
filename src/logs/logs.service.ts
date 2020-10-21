import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TranslationHelper } from '../../libs/translation.helper';
import { Entities, LogTranslationKeys } from '../../types/translation.types';
import { Log } from './log.entity';
import { LogRepository } from './logs.repository';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(LogRepository)
    private logRepository: LogRepository,
    private translationHelper: TranslationHelper,
  ) {}

  async createLog(
    action: string,
    emitter: string,
    target: string,
  ): Promise<Log> {
    return this.logRepository.createLog(action, emitter, target);
  }

  async deleteLog(id: number): Promise<void> {
    const result = await this.logRepository.deleteLog(id);

    if (!result.affected) {
      throw new NotFoundException(
        this.translationHelper.get(
          Entities.Logs,
          LogTranslationKeys.LOG_DELETE_NOT_FOUND,
        ),
      );
    }
  }
}
