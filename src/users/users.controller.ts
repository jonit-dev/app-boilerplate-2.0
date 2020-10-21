import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AdminGuard } from '../../guards/isAdmin.guard';
import { TSHelper } from '../../libs/language.helper';
import { GetUser } from '../auth/auth.decorators';
import { User } from './user.entity';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private tsHelper: TSHelper) {}

  @Get('/self')
  getOwnInfo(@GetUser() user: User): User {
    return user;
  }

  @Get('/admin')
  @UseGuards(AdminGuard)
  adminOnlyTest(@GetUser() user: User): any {
    return {
      status: 'success',
      message: 'Welcome admin!',
    };
  }

  @Get('/test')
  testRoute(): any {
    return {
      status: 'success',
      message: 'another test route',
    };
  }
}
