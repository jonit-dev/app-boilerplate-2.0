import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '../users/user.repository';
import { AuthCredentialsDTO } from './auth.dto';
import { IAuthGranted, IJwtPayload } from './auth.types';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) { }



  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return this.userRepository.signUp(authCredentialsDTO)
  }

  async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<IAuthGranted> {
    const email = await this.userRepository.validateUserPassword(authCredentialsDTO)

    if (!email) {
      throw new UnauthorizedException("Invalid credentials")
    }

    const payload: IJwtPayload = { email }
    const accessToken = await this.jwtService.signAsync(payload)

    return { accessToken }

  }


}
