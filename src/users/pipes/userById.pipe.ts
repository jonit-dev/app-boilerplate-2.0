import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../user.entity';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserById implements PipeTransform<number, Promise<User>> {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async transform(value: number, metadata: ArgumentMetadata): Promise<User> {
    const id = value;

    try {
      const user = await this.userRepository.findOne({ id });

      return user;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(`User id ${id} not found!`);
    }
  }
}
