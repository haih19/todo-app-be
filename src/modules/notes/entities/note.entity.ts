import { User } from '@/modules/auth/entities/user.entity';
import { VisibilityEnum } from '@/modules/notes/enums/notes.enum';
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

  @Column({ type: 'enum', enum: VisibilityEnum, default: VisibilityEnum.Private })
  visibility: VisibilityEnum;

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
