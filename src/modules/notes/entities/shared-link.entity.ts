import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Note } from './note.entity';

@Entity()
export class SharedLink {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Note)
  @JoinColumn({ name: 'note_id' })
  note: Note;

  @Column()
  link: string;

  @Column('timestamp')
  expirationDate: Date;

  @CreateDateColumn()
  createdAt: Date;
}
