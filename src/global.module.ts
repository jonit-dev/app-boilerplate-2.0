import { Global, Module } from '@nestjs/common';

import { TranslationHelper } from '../libs/translation.helper';

//https://docs.nestjs.com/modules#global-modules
@Global()
@Module({
  controllers: [],
  providers: [TranslationHelper],
  exports: [TranslationHelper],
})
export class GlobalModule {}
