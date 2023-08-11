import { IsNotEmpty, IsNumber, IsSemVer, IsString } from 'class-validator';
import { AuthorEntity } from '../entities/author.entity';

export class BookDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsString()
  editor: string;

  @IsNotEmpty()
  author: AuthorEntity;
}
