import { DeleteResult, EntityRepository, Repository } from 'typeorm';

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
}
