import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStampEntity } from '../Generics/timestamp';
import { BookEntity } from './book.entity';

@Entity('authors')
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prenom: string;

  @Column()
  nom: string;

  // @OneToMany((type) => BookEntity, (book) => book.id)
  // livres: BookEntity[];
}
