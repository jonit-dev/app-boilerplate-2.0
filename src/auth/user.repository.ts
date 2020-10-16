import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';

import { ErrorCodes } from '../types/errorCodes.types';
import { AuthCredentialsDTO } from './auth.dto';
import { User } from './user.entity';


@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {

    const { email, password } = authCredentialsDTO

    const salt = await bcrypt.genSalt();

    try {
      const user = new User();
      user.email = email
      user.salt = salt;
      user.password = await this.hashPassword(password, salt);

      await user.save();
    }
    catch (error) {
      if (error.code === ErrorCodes.DuplicateEntry) {
        console.log('USER ALREADY EXISTS!');
        throw new ConflictException('This user already exists!')
      } else {
        throw new InternalServerErrorException();
      }
    }
  }


  async validateUserPassword(authCredentialsDTO: AuthCredentialsDTO): Promise<string | null> {
    const { email, password } = authCredentialsDTO

    const user = await this.findOne({ email })

    // If user exists and password is valid
    if (user && await user.validatePassword(password)) {
      return user.email
    } else {
      return null
    }

  }


  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }


}