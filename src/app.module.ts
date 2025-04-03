import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppLoggerModule } from './modules/app-logger/app-logger.module';

@Module({
  imports: [ConfigModule.forRoot(), AppLoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
