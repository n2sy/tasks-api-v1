import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { AuthorEntity } from './entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, AuthorEntity])],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
