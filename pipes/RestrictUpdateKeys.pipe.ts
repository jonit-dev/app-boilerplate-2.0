import { ForbiddenException, PipeTransform } from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common/interfaces/features/pipe-transform.interface';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class RestrictUpdateKeys implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    // You have to convert to class first, otherwise validate won't work!
    const object = plainToClass(metatype, value);

    const hasError = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    const forbiddenProperties = hasError.map((item) => {
      return `${item.property} (${Object.values(item.constraints).join(', ')})`;
    });

    if (hasError.length) {
      throw new ForbiddenException(
        `Error while trying to update the following forbidden keys: ${forbiddenProperties}`,
      );
    }

    return value;
  }
}
