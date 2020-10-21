import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LogRepository } from './logs.repository';
import { LogsService } from './logs.service';

@Module({
  imports: [TypeOrmModule.forFeature([LogRepository])],
  providers: [LogsService],
})
export class LogsModule {}
