import { Injectable } from '@nestjs/common';
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
}
