import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

import { TSHelper } from '../libs/language.helper';
import { UserTypes } from '../src/users/user.types';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private tsHelper: TSHelper) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(request): boolean | Promise<boolean> | Observable<boolean> {
    const { user } = request;

    if (user.type !== UserTypes.Admin) {
      throw new UnauthorizedException(
        this.tsHelper.get('users', 'TEST', {
          var: 'SUCESSO!',
          foo: 'hello',
          bar: 'world',
        }),
      );
    }

    return true;
  }
}
