import { ForbiddenException, PipeTransform } from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common/interfaces/features/pipe-transform.interface';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { TranslationHelper } from '../libs/translation.helper';
import { Entities, GlobalTranslationKeys } from '../types/translation.types';

export class RestrictUpdateKeys implements PipeTransform {
  private translationHelper: TranslationHelper;

  constructor() {
    this.translationHelper = new TranslationHelper();
  }

  async transform(value, { metatype }: ArgumentMetadata): Promise<any> {
    // You have to convert to class first, otherwise validate won't work!
    const object = plainToClass(metatype, value);

    const hasError = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    const forbiddenProperties = hasError.map(item => {
      return `${item.property} (${Object.values(item.constraints).join(', ')})`;
    });

    if (hasError.length) {
      throw new ForbiddenException(
        this.translationHelper.get(
          Entities.Global,
          GlobalTranslationKeys.FORBIDDEN_KEY_UPDATE,
          { forbiddenProperties: forbiddenProperties.join('') },
        ),
      );
    }

    return value;
  }
}
