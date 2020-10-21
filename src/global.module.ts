import { Global, Module } from '@nestjs/common';

import { TranslationHelper } from '../libs/language.helper';

@Global()
@Module({
  controllers: [],
  providers: [TranslationHelper],
  exports: [TranslationHelper],
})
export class GlobalModule {}
