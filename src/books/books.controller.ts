import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksModule } from './books.module';
import { BookDTO } from './dto/book.dto';
import { Response } from 'express';

@Controller('books')
export class BooksController {
  constructor(private bookSer: BooksService) {}

  // Routes dynamiques en haut
  @Get('stat')
  async getNbBooksPerYear() {
    return this.bookSer.nbBooksPerYear();
  }

  @Get('stat2')
  async getNbBooksPerYear2(@Body() body, @Res() res: Response) {
    let retour = await this.bookSer.nbBooksPerYearV2(body.y1, body.y2);
    return res.status(202).json(retour);
  }

  @Post('add')
  addNewBook(@Body() newBook: BookDTO) {
    console.log("Ajout d'un livre");

    this.bookSer.addBook(newBook);
  }

  @Get('all/:id')
  async getOneBook(@Param('id') id, @Res() res: Response) {
    const retour = await this.bookSer.getBookById(id);

    res.json(retour);
  }

  @Delete(':id')
  async deleteOnoOrManyBooks(@Param('id') id, @Res() res: Response) {
    const retour = await this.bookSer.getBookById(id);
    const retourDelete = await this.bookSer.deleteBook(retour);
    return res.json(retourDelete);
  }

  // @Delete('soft/:id')
  // async softDeleteOnoOrManyBooks(@Param('id') id, @Res() res: Response) {
  //   const retourDelete = await this.bookSer.sofRemoveBook(id);
  //   return res.json(retourDelete);
  // }

  // @Get('recover/:id')
  // async recoverOneBook(@Param('id', ParseIntPipe) id, @Res() res: Response) {
  //   const retourRecover = await this.bookSer.recoverBook(id);
  //   return res.json(retourRecover);
  // }

  @Delete('soft/:id')
  async softDeleteOnoOrManyBooks(@Param('id') id, @Res() res: Response) {
    const retourDelete = await this.bookSer.sofDeleteBook(id);
    return res.json(retourDelete);
  }

  @Get('recover/:id')
  async recoverOneBook(@Param('id', ParseIntPipe) id, @Res() res: Response) {
    const retourRecover = await this.bookSer.restoreBook(id);
    return res.json(retourRecover);
  }

  @Get('all')
  async getBooks(@Res() res: Response) {
    const all = await this.bookSer.getAllBooks();
    console.log(all);

    res.json(all);
  }

  @Patch('update/:id')
  async updateABook(
    @Param('id', ParseIntPipe) id,
    @Body() body,
    @Res() res: Response,
  ) {
    const retour = await this.bookSer.updateBook(id, body);
    console.log(retour, 'Update réussi');
    res.json(retour);
  }
}
