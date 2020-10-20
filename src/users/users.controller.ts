import { Controller, Get, Param } from '@nestjs/common';

import { UserById } from './pipes/userById.pipe';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  @Get('/:id')
  getOne(@Param('id', UserById) user: User): User {
    return user;
  }
}
