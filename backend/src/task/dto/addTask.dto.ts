import { IsString, MaxLength, MinLength } from "class-validator";

export class AddTaskDto {
    @IsString()
    @MinLength(3, {message: "Title must be longer than 3 characters"})
    @MaxLength(255, {message: "Title can't be longer than 255 characters"})
    title: string

    @IsString()
    @MinLength(3, {message: "Content must be longer than 3 characters"})
    content: string
}