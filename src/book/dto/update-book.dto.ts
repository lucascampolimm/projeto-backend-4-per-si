import { IsEmpty, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from '../schemas/book.schema';
import { User } from '../../auth/schemas/user.schema';

export class UpdateBookDto {
    @IsOptional()
    @IsString({ message: 'Título está esperando uma string' })
    readonly title: string;

    @IsOptional()
    @IsString({ message: 'Descrição está esperando uma string' })
    readonly description: string;

    @IsOptional()
    @IsString({ message: 'Autor está esperando uma string' })
    readonly author: string;

    @IsOptional()
    @IsNumber({}, { message: 'Preço está esperando um number' })
    readonly price: number;

    @IsOptional()
    @IsEnum(Category, { message: 'Insira uma categoria válida' })
    readonly category: Category;

    @IsEmpty({ message: 'Você não pode passsar o ID do usuário' })
    readonly user: User;

    @IsEmpty({ message: 'Você não pode passsar o status do livro' })
    readonly isAvailable: boolean;
}
