import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AdminGuard } from '../../guards/isAdmin.guard';
import { GetUser } from '../auth/auth.decorators';
import { Log } from '../logs/log.entity';
import { LogsService } from '../logs/logs.service';
import { User } from './user.entity';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private logService: LogsService) {}

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
  async testRoute(): Promise<Log> {
    return this.logService.createLog(
      'TEST_ACTION',
      'TEST_EMITTER',
      'TEST_TARGET',
    );
  }
}
