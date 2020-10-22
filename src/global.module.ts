import { Global, Module } from '@nestjs/common';

import { TextHelper } from '../libs/text.helper';
import { TranslationHelper } from '../libs/translation.helper';

//https://docs.nestjs.com/modules#global-modules
@Global()
@Module({
  controllers: [],
  providers: [TranslationHelper, TextHelper],
  exports: [TranslationHelper, TextHelper],
})
export class GlobalModule {}
