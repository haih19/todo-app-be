import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppLoggerService } from './modules/app-logger/app-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = app.get(AppLoggerService);
  const port = configService.get<number>('PORT', 8080);
  await app.listen(port, () => {
    logger.log(`Server running on http://localhost:${port}`, 'Main');
  });
}
void bootstrap();
