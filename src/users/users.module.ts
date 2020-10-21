import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/jwt.strategy';
import { LogsModule } from '../logs/logs.module';
import { LogRepository } from '../logs/logs.repository';
import { LogsService } from '../logs/logs.service';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    TypeOrmModule.forFeature([LogRepository]),
    AuthModule,
    LogsModule,
  ],
  controllers: [UsersController],
  providers: [JwtStrategy, LogsService],
})
export class UsersModule {}
