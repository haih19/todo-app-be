import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppLoggerModule } from './modules/app-logger/app-logger.module';
import { AuthModule } from './modules/auth/auth.module';
import { NotesModule } from './modules/notes/notes.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [ConfigModule.forRoot(), AppLoggerModule, AuthModule, NotesModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
