import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TSHelper } from '../../libs/language.helper';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), AuthModule],
  controllers: [UsersController],
  providers: [JwtStrategy, TSHelper],
})
export class UsersModule {}
