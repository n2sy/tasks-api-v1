import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';
import { BookDTO } from './dto/book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepo: Repository<BookEntity>,
  ) {}

  async addBook(book): Promise<BookEntity> {
    return await this.bookRepo.save(book);
  }

  getAllBooks(): Promise<BookEntity[]> {
    return this.bookRepo.find();
  }

  async getBookById(id) {
    const b = await this.bookRepo.findOne(id);
    if (!b) throw new NotFoundException('hahahahahahahah');
    return b;
  }

  // deleteBook(dBook) {
  //   return this.bookRepo.delete({ title: dBook.title });
  // }
  deleteBook(dBook) {
    return this.bookRepo.remove(dBook);
  }

  // probleme avec softremove
  async sofRemoveBook(id: number) {
    const bookToRemove = await this.bookRepo.findOne(id);
    if (!bookToRemove)
      throw new NotFoundException(`Le livre qui a pour id ${id} n'existe pas `);

    return this.bookRepo.softRemove(bookToRemove);
  }

  async recoverBook(id: number) {
    const a = !null;
    const bookToRemove = await this.bookRepo.findOne(id);
    console.log(bookToRemove);

    if (!bookToRemove)
      throw new NotFoundException(`Le livre qui a pour id ${id} n'existe pas `);
    else return this.bookRepo.recover(bookToRemove);
  }

  // Delete tu peux lui passer un id alors que Remove non a besoin de l'objet
  async sofDeleteBook(id: number) {
    return this.bookRepo.softDelete(id);
  }

  async restoreBook(id: number) {
    return this.bookRepo.restore(id);
  }

  async updateBook(id, uBook: Partial<BookDTO>) {
    //return this.bookRepo.update({ id }, uBook);
    const selectedBook = await this.bookRepo.preload({
      id: id,
      ...uBook,
    });
    console.log('selected book', selectedBook);
    return this.bookRepo.save(selectedBook);
  }

  nbBooksPerYear() {
    const qb = this.bookRepo.createQueryBuilder('book');

    return (
      qb
        // .select('book.year, count(book.id)')
        .select('book.year, count(book.id) as nombreDeBooks')
        .groupBy('book.year')
        .getRawMany()

      // qb.getSql() te donne la requete SQL
    );

    //getMany retourne un ensemble d'entité
  }

  nbBooksPerYearV2(yearMin: number, yearMax: number) {
    const qb = this.bookRepo.createQueryBuilder('book');

    return qb
      .select('book.year, count(book.id) as nombreDeBooks')
      .where('book.year >= :yearMin and book.year <= :yearMax')
      .setParameters({ yearMin, yearMax })
      .groupBy('book.year')
      .getRawMany();
  }
}
