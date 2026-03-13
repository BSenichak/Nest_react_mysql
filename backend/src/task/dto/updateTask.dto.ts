import { IsOptional, IsString, IsDate } from "class-validator"

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @IsString()
    content?: string

    @IsOptional()
    @IsDate()
    datetime?: Date
}