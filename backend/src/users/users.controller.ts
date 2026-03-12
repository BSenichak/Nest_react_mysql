import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../auth/dto/createUserDto.dto';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(AuthGuard)
    getUserInfo(@Request() req){
        return this.usersService.getUserInfo(req.user.id)
    }
}


