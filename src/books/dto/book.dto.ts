import { IsNotEmpty, IsNumber, IsSemVer, IsString } from 'class-validator';

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
  @IsNumber()
  author: number;
}
