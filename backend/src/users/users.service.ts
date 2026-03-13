import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/createUserDto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../db/users.entity';
import { Repository } from 'typeorm';
import bcrypt from "bcrypt"

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userReposetory: Repository<User>
    ) { }
    async getAllUsers() {
        return await this.userReposetory.find()
    }

    async getUser(id: number) {
        let user = await this.userReposetory.findOneBy({ id })
        if (user == null) throw new NotFoundException("User not found")
        return user
    }

    async createUser(dto: CreateUserDto) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(dto.password, salt);

        const newUser = this.userReposetory.create({
            ...dto,
            password: hashedPassword,
        });

        return this.userReposetory.save(newUser);
    }

    async findOne(email: string): Promise<User | null> {
        return this.userReposetory.findOne({
            where: { email },
            select: ["email", "id", "name", "password", "username"]
        });
    }
    
    async getUserInfo(id: number): Promise<User | null> {
        return await this.userReposetory.findOne({
            where: { id },
            select: ["id", "email", "name", "username"] 
        });
    }
}
