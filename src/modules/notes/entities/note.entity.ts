import { User } from '@/modules/auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from './permission.entity';
import { SharedLink } from './shared-link.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ enum: ['PUBLIC', 'PRIVATE'], default: 'PRIVATE' })
  visibility: 'PUBLIC' | 'PRIVATE';

  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Permission, (permission) => permission.note)
  permissions: Permission[];

  @OneToMany(() => SharedLink, (sharedLink) => sharedLink.note)
  sharedLinks: SharedLink[];
}
