import { Body, Controller, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksModule } from './books.module';

@Controller('books')
export class BooksController {
  constructor(private bookSer: BooksService) {}

  @Post('add')
  addNewBook(@Body() newBook) {
    console.log("Ajout d'un livre");

    this.bookSer.addBook(newBook);
  }
}
