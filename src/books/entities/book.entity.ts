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
export class BookEntity extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    // update: false,
  })
  title: string;

  @Column()
  year: number;

  @Column()
  editor: string;

  @ManyToOne((type) => AuthorEntity, (author) => author.id)
  author: AuthorEntity;
}
