import { IsNumber, IsString, MinLength } from "class-validator"
import { Type } from "class-transformer";

export class UserDto {
    @IsString({ message: "not string" })
    @MinLength(3, { message: "Too short" })
    name: string;
}