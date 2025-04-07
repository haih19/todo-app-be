import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppLoggerService } from './modules/app-logger/app-logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = app.get(AppLoggerService);
  const port = configService.get<number>('PORT', 8080);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Todo App API')
    .setDescription('API document for the Todo App')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, () => {
    logger.log(`Server running on http://localhost:${port}`, 'Main');
  });
}
void bootstrap();
