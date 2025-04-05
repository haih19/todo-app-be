import { OAuthAccount } from '@/modules/auth/entities/oauth-account.entity';
import { RefreshToken } from '@/modules/auth/entities/refresh-token.entity';
import { User } from '@/modules/auth/entities/user.entity';
import { Note } from '@/modules/notes/entities/note.entity';
import { Permission } from '@/modules/notes/entities/permission.entity';
import { SharedLink } from '@/modules/notes/entities/shared-link.entity';
import { Role } from '@/modules/roles/entities/role.entity';
import { UserRole } from '@/modules/roles/entities/user-role.entity';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        entities: [User, OAuthAccount, RefreshToken, Note, Permission, SharedLink, Role, UserRole],
        ssl: { rejectUnauthorized: false },
        autoLoadEntities: true,
        synchronize: false,
        url: configService.get('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
