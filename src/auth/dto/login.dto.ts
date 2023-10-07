import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsNotEmpty({ message: 'E-mail não pode estar vazio' })
    @IsEmail({}, { message: 'E-mail está esperando um e-mail' })
    readonly email: string;

    @IsNotEmpty({ message: 'Password não pode estar vazio' })
    @IsString({ message: 'Password está esperando uma string' })
    @MinLength(6, { message: 'Password deve ter no mínimo 6 caracteres' })
    readonly password: string;
}
