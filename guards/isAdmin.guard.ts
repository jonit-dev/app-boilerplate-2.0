import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

import { JwtStrategy } from '../src/auth/jwt.strategy';
import { UserTypes } from '../src/users/user.types';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtStrategy: JwtStrategy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(request): boolean | Promise<boolean> | Observable<boolean> {
    const { user } = request;

    if (user.type !== UserTypes.Admin) {
      throw new UnauthorizedException('Only admins can access this route!');
    }

    return true;
  }
}
