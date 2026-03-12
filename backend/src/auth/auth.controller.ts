import { Controller, Post, Body, } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";
import { CreateUserDto } from "./dto/createUserDto.dto";
import { LoginUserDto } from "./dto/loginUserDto.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) { }

    @Post('register')
    register(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginUserDto) {
        return this.authService.signIn(loginDto.email, loginDto.password);
    }
}