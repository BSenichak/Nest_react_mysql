import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { Task, TasksState } from "./tasksReducer";
import getTasks from "./getTasks";

const addTask = createAsyncThunk("tasks/addTask", async (data: { title: string, content: string }, { rejectWithValue, dispatch}) => {
    try {
        let response = await axios.post("/task/", data)
        if (response.status >= 400) {
            return rejectWithValue(response)
        }
        await dispatch(getTasks())
        return response.data
    } catch (error: any) {
        return rejectWithValue(error?.message)
    }
})

export const addTask_reducers = {
    pending: (state: TasksState) => {
        state.loading = true
    },
    rejected: (state: TasksState, error: PayloadAction<any>) => {
        state.loading = false
        state.error = error.payload
    },
    fulfilled: (state: TasksState, actions: PayloadAction<Task>) => {
        state.loading = false
        state.task = actions.payload
    }
}

export default addTask