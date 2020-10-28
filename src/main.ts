import { Entities, GlobalTranslationKeys } from '@little-sentinel/shared';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { TranslationHelper } from '../libs/translation.helper';
import { ColorTemplate, CustomLogger } from '../loggers/custom.logger';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  // Fastify x NestJS: https://docs.nestjs.com/techniques/performance
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const logger = new CustomLogger('bootstrap');

  // This global interceptor makes possible to use custom decorators such as @Exclude in some entities
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const configService = app.get(ConfigService);
  const port = configService.get('SERVER_PORT');
  const env = configService.get('ENV');
  const language = configService.get('LANGUAGE');
  const timezone = configService.get('TIMEZONE');
  const adminEmail = configService.get('ADMIN_EMAIL');

  const translationHelper = new TranslationHelper();

  await app.listen(port, '0.0.0.0', (err: Error) => {
    if (err) {
      logger.error(
        translationHelper.get(
          Entities.Global,
          GlobalTranslationKeys.SERVER_BOOTSTRAP_ERROR,
          {
            port,
          },
        ),
        err.message,
      );
      return;
    }

    logger.customLog(
      translationHelper.get(
        Entities.Global,
        GlobalTranslationKeys.SERVER_RUNNING,
        { env, port, language, timezone, adminEmail },
      ),
      env === 'Development' ? ColorTemplate.Yellow : ColorTemplate.Red,
    );
  });
}
bootstrap();
