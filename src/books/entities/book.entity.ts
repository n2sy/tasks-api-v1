import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthorEntity } from './author.entity';
import { TimeStampEntity } from '../Generics/timestamp';

@Entity('livre')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  year: number;

  @Column()
  editor: string;

  @CreateDateColumn({
    name: 'createdAt',
    default: 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne((type) => AuthorEntity, (author) => author.id)
  author: AuthorEntity;
}
