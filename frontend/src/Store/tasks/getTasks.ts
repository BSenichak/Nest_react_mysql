import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { Task, TasksState } from "./tasksReducer";

const getTasks = createAsyncThunk("tasks/getTasks", async (offset: number | null, { rejectWithValue }) => {
    try {
        let response = await axios.get("/task", {
            params: {
                offset
            }
        })
        if (response.status >= 400) {
            return rejectWithValue(response)
        }
        return response.data
    } catch (error: any) {
        return rejectWithValue(error?.message)
    }
})

export const getTasks_reducers = {
    pending: (state: TasksState) => {
        state.loading = true
    },
    rejected: (state: TasksState, error: PayloadAction<any>) => {
        state.loading = false
        state.error = error.payload
    },
    fulfilled: (state: TasksState, actions: PayloadAction<[Array<Task>, number]>) => {
        state.loading = false
        state.tasks = actions.payload[0]
        state.tasksCount = actions.payload[1]
    }
}

export default getTasks