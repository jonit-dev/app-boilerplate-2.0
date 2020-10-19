import { ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { ColorTemplate, CustomLogger } from './loggers/CustomLogger';


async function bootstrap(): Promise<void> {


  const app = await NestFactory.create(AppModule);

  const logger = new CustomLogger('bootstrap')

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const configService = app.get(ConfigService)
  const port = configService.get('SERVER_PORT')
  const env = configService.get('ENV')
  const language = configService.get('LANGUAGE')
  const timezone = configService.get('TIMEZONE')
  const adminEmail = configService.get('ADMIN_EMAIL')

  await app.listen(port);

  logger.customLog(`Server is running on ${env} | Port: ${port} | Language: ${language} | Timezone: ${timezone} | Admin: ${adminEmail}`, env === "Development" ? ColorTemplate.Yellow : ColorTemplate.Red)


}
bootstrap();
