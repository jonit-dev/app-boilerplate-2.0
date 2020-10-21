import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { TranslationHelper } from '../../libs/language.helper';
import { AuthTranslationKeys, Entities } from '../../types/translation.types';
import { UserRepository } from '../users/user.repository';
import { AuthCredentialsDTO } from './auth.dto';
import { IAuthGranted, IJwtPayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private translationHelper: TranslationHelper,
  ) {}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return this.userRepository.signUp(authCredentialsDTO);
  }

  async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<IAuthGranted> {
    const email = await this.userRepository.validateUserPassword(
      authCredentialsDTO,
    );

    if (!email) {
      throw new UnauthorizedException(
        this.translationHelper.get(
          Entities.Auth,
          AuthTranslationKeys.INVALID_CREDENTIALS,
        ),
      );
    }

    const payload: IJwtPayload = { email };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
