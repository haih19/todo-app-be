import { UserStatusEnum } from '@/modules/auth/enums/auth.enums';
import { Note } from '@/modules/notes/entities/note.entity';
import { Permission } from '@/modules/notes/entities/permission.entity';
import { UserRole } from '@/modules/roles/entities/user-role.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserOAuthAccount } from './oauth-account.entity';
import { UserRefreshToken } from './refresh-token.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ type: 'enum', enum: UserStatusEnum, default: UserStatusEnum.Active })
  status: UserStatusEnum;

  @OneToMany(() => UserOAuthAccount, (oauthAccount) => oauthAccount.user)
  oauthAccounts: UserOAuthAccount[];

  @OneToMany(() => UserRefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: UserRefreshToken[];

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];

  @OneToMany(() => Permission, (permission) => permission.user)
  permissions: Permission[];

  @OneToMany(() => Note, (note) => note.owner)
  notes: Note[];
}
