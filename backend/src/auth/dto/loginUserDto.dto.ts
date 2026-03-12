import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
    @IsEmail({}, { message: "Некоректний формат email" })
    email: string;

    @IsString({ message: "Пароль має бути рядком" })
    @MinLength(6, { message: "Пароль має бути не менше 6 символів" })
    password: string;
}