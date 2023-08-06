import { IsIn, IsNotEmpty, IsString, MinLength } from "class-validator";

export class TaskDTO {
    @IsString()
    @IsNotEmpty()
    title : string;

    @IsString()
    @MinLength(5)
    description : string;

    @IsString()
    @IsIn(['done', 'todo', 'in progress'])
    statut : string;
   
}