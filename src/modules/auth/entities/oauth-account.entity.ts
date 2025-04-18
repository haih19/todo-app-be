import { OAuthProviderEnum } from '@/modules/auth/enums/auth.enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserOAuthAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.oauthAccounts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'enum', enum: OAuthProviderEnum })
  provider: OAuthProviderEnum;

  @Column()
  @Index(['provider', 'providerUserId'], { unique: true })
  providerUserId: string;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @Column({ nullable: true })
  tokenType?: string;

  @Column({ nullable: true })
  scope?: string;

  @Column({ type: 'timestamp', nullable: true })
  accessTokenExpiresAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
