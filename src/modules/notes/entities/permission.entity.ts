import { User } from '@/modules/auth/entities/user.entity';
import { PermissionEnum } from '@/modules/notes/enums/notes.enum';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Note } from './note.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.permissions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Note, (note) => note.permissions)
  @JoinColumn({ name: 'note_id' })
  note: Note;

  @Column({ type: 'enum', enum: PermissionEnum })
  permission: PermissionEnum;
}
