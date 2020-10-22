import moment from 'moment-timezone';
import { DeleteResult, EntityRepository, LessThan, MoreThan, Repository } from 'typeorm';

import { Log } from './log.entity';

@EntityRepository(Log)
export class LogRepository extends Repository<Log> {
  async createLog(action, emitter, target): Promise<Log> {
    const log = new Log();
    log.action = action;
    log.emitter = emitter;
    log.target = target;
    log.timestamp = new Date();

    await log.save();

    return log;
  }

  async deleteLog(id: number): Promise<DeleteResult> {
    return await Log.delete({ id });
  }

  async getLogsDate(
    date: Date,
    action: string,
    beforeOrAfter: 'BEFORE' | 'AFTER',
  ): Promise<Log[]> {
    const formattedDate = moment
      .tz(date, process.env.TIMEZONE)
      .format('YYYY-MM-DD[T00:00:00.000Z]');

    return await this.find({
      where: {
        action,
        timestamp:
          beforeOrAfter === 'BEFORE'
            ? LessThan(formattedDate)
            : MoreThan(formattedDate),
      },
    });
  }
}
