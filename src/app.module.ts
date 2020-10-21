import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { appConfig } from '../config/config';
import { DatabaseConfig } from '../config/database.config';
import { AuthModule } from './auth/auth.module';
import { GlobalModule } from './global.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [
    GlobalModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),

    AuthModule,
    UsersModule,
    LogsModule,
  ],
})
export class AppModule {}
