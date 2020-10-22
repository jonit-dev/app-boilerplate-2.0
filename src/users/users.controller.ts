import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

import { TransactionalEmail } from '../../emails/TransactionalEmail';
import { AdminGuard } from '../../guards/isAdmin.guard';
import { GetUser } from '../auth/auth.decorators';
import { LogRepository } from '../logs/logs.repository';
import { LogsService } from '../logs/logs.service';
import { User } from './user.entity';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(
    private logService: LogsService,

    @InjectRepository(LogRepository)
    private logRepository: LogRepository,

    private transactionalEmail: TransactionalEmail,
  ) {}

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
  async testRoute(): Promise<any> {
    // this.logService.createLog(
    //   'TEST_ACTION',
    //   'TEST_EMITTER',
    //   'TEST_TARGET',
    // );

    await this.transactionalEmail.send(
      'app.boilerplate2.0@gmail.com',
      'Hello World!',
      'notification',
      {
        notificationGreetings: 'Hi there',
        notificationMessage: 'This is a test',
        notificationEndPhrase: 'bye',
      },
    );
  }
}
