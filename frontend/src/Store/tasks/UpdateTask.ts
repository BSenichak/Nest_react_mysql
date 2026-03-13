import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { Task, TasksState } from "./tasksReducer";

const updateTask = createAsyncThunk("tasks/updateTask", async (data: { title: string, content: string, id: number }, { rejectWithValue, }) => {
    try {
        let response = await axios.put("/task/" + data.id, data)
        if (response.status >= 400) {
            return rejectWithValue(response)
        }
        return response.data
    } catch (error: any) {
        return rejectWithValue(error?.message)
    }
})

export const updateTask_reducers = {
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

export default updateTask