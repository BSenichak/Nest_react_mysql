import { createSlice } from '@reduxjs/toolkit'
import getTasks, { getTasks_reducers } from './getTasks';
import getOneTask, { getOneTask_reducers } from './getOneTask';
import deleteTask, { deleteTask_reducers } from './deleteTask';
import updateTask, { updateTask_reducers } from './UpdateTask';
import addTask, { addTask_reducers } from './addTask';

export type Task = {
    content: string
    datetime: Date
    id: number
    title: string
}

export type TasksState = {
    loading: boolean,
    tasks: Array<Task>,
    error: string | null,
    task: Task | null
    page: number,
    limit: number
    tasksCount: number
}
const initialState: TasksState = {
    loading: false,
    tasks: [],
    error: null,
    task: null,
    page: 0,
    limit: 10,
    tasksCount: 0
}

const tasksReducer = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        clearTask: (state: TasksState)=> {
            state.task = null
        },
        clearTasksError: (state: TasksState)=> {
            state.error = null
        }
    },
    extraReducers(builder) {
        builder.addCase(getTasks.pending, getTasks_reducers.pending)
        builder.addCase(getTasks.rejected, getTasks_reducers.rejected)
        builder.addCase(getTasks.fulfilled, getTasks_reducers.fulfilled)
        builder.addCase(getOneTask.pending, getOneTask_reducers.pending)
        builder.addCase(getOneTask.rejected, getOneTask_reducers.rejected)
        builder.addCase(getOneTask.fulfilled, getOneTask_reducers.fulfilled)
        builder.addCase(deleteTask.pending, deleteTask_reducers.pending)
        builder.addCase(deleteTask.rejected, deleteTask_reducers.rejected)
        builder.addCase(deleteTask.fulfilled, deleteTask_reducers.fulfilled)
        builder.addCase(updateTask.pending, updateTask_reducers.pending)
        builder.addCase(updateTask.rejected, updateTask_reducers.rejected)
        builder.addCase(updateTask.fulfilled, updateTask_reducers.fulfilled)
        builder.addCase(addTask.pending, addTask_reducers.pending)
        builder.addCase(addTask.rejected, addTask_reducers.rejected)
        builder.addCase(addTask.fulfilled, addTask_reducers.fulfilled)
    },
});

export const { clearTask, clearTasksError } = tasksReducer.actions

export default tasksReducer.reducer