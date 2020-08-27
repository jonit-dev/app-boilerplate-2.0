import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthCredentialsDTO } from './auth.dto';
import { IJwtPayload } from './auth.types';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {

  }

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return this.userRepository.signUp(authCredentialsDTO)
  }

  async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<{ accessToken: string }> {
    const userName = await this.userRepository.validateUserPassword(authCredentialsDTO)

    if (!userName) {
      throw new UnauthorizedException("Invalid credentials")
    }

    const payload: IJwtPayload = { userName }
    const accessToken = await this.jwtService.signAsync(payload)

    return { accessToken }

  }


}
