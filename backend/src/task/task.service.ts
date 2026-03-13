import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { Task } from 'src/db/task.entity';
import { Repository } from 'typeorm';
import { AddTaskDto } from './dto/addTask.dto';
import { User } from 'src/db/users.entity';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) { }

    addNewTask(task: AddTaskDto, user: any) {
        let newTask = this.taskRepository.create({ ...task, user })
        return this.taskRepository.save(newTask)
    }

    getTasks(take: number, skip: number, user: any) {
        return this.taskRepository.find({
            where: { user: { id: user } },
            take,
            skip,
            select: ['id', "title", "content", "datetime"]
        })
    }

    async getOneTask(id: number, user_id: any) {
        let task = await this.taskRepository.findOne({
            where: {
                id,
                user: { id: user_id }
            }
        })
        console.log(task)
        if (!task) throw new NotFoundException("Task not found")
        return task
    }

    async deleteTask(id: number, userId: number) {
        const task = await this.taskRepository.findOne({
            where: { id, user: { id: userId } }
        })

        if (!task) {
            throw new NotFoundException('Task not found')
        }

        await this.taskRepository.remove(task)
        return { message: 'Task deleted successfully' }
    }

    async updateTask(id: number, userId: number, data: UpdateTaskDto) {
        const task = await this.taskRepository.findOne({
            where: { id, user: { id: userId } }
        })

        if (!task) {
            throw new NotFoundException('Task not found')
        }

        Object.assign(task, data) 
        return this.taskRepository.save(task)
    }
}
