import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString({ message: "Ім'я має бути рядком" })
    @IsNotEmpty({ message: "Ім'я не може бути порожнім" })
    @MinLength(3, { message: "Ім'я занадто коротке (мінімум 3 символи)" })
    name: string;

    @IsString({ message: "Логін має бути рядком" })
    @IsNotEmpty({ message: "Логін обов'язковий" })
    @MinLength(3, { message: "Логін занадто короткий" })
    username: string;

    @IsEmail({}, { message: "Некоректний формат email" })
    email: string;

    @IsString({ message: "Пароль має бути рядком" })
    @MinLength(6, { message: "Пароль має бути не менше 6 символів" })
    password: string;
}