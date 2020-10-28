import { Entities, UserTranslationKeys } from '@little-sentinel/shared';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

import { TranslationHelper } from '../libs/translation.helper';
import { UserTypes } from '../src/users/user.types';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private translationHelper: TranslationHelper) {}

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
        this.translationHelper.get(
          Entities.Users,
          UserTranslationKeys.ADMIN_ONLY,
        ),
      );
    }

    return true;
  }
}
