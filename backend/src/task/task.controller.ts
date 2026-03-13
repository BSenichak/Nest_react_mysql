import { Body, Controller, Get, Post, UseGuards, Request, Query, ParseIntPipe, DefaultValuePipe, Param, Delete, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddTaskDto } from './dto/addTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    @UseGuards(AuthGuard)
    addNewTask(@Body() data: AddTaskDto, @Request() req) {
        return this.taskService.addNewTask(data, req.user.id)
    }

    @Get()
    @UseGuards(AuthGuard)
    getTasks(
        @Query("limit", new DefaultValuePipe(10), ParseIntPipe) take: number,
        @Query("offset", new DefaultValuePipe(0), ParseIntPipe) skip: number,
        @Request() req
    ) {
        return this.taskService.getTasks(take, skip, req.user.id)
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    getOneTask(
        @Param("id", ParseIntPipe) id: number,
        @Request() req
    ) {
        return this.taskService.getOneTask(id, req.user.id)
    }

    @Delete(":id")
    @UseGuards(AuthGuard)
    deleteTask(@Param("id", ParseIntPipe) id: number, @Request() req) {
        return this.taskService.deleteTask(id, req.user.id)
    }

    @Put(":id")
    @UseGuards(AuthGuard)
    updateTask(
        @Param("id", ParseIntPipe) id: number,
        @Body() data: UpdateTaskDto,
        @Request() req
    ) {
        return this.taskService.updateTask(id, req.user.id, data)
    }
}
