import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../users/user.entity';
import { UserRepository } from '../users/user.repository';
import { IJwtPayload } from './auth.types';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('authentication.jwtSecret')
    })
  }

  async validate(payload: IJwtPayload): Promise<User> {
    const { email } = payload;
    const user = await this.userRepository.findOne({ email })

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }

}