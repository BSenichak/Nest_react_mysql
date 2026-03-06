import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

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

    async createUser(user: UserDto) {
        let data = await this.userReposetory.create({ ...user })
        return this.userReposetory.save(data)

    }
}
