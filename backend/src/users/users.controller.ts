import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './create-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getAllUsers(){
        return this.usersService.getAllUsers()
    }
    @Get("search")
    getUserNameAndAge(@Query("name") name: string, @Query("age") age: string): string {
        return `User with name ${name} have ${age} yearld old `
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    getUser(@Param("id", ParseIntPipe) id: number) {
        return this.usersService.getUser(id)
    }

    @Post()
    createUser(@Body() body: UserDto) {
        return this.usersService.createUser(body)
    }
}


