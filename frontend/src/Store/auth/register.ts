import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { AuthState } from "./authReducer";

const register = createAsyncThunk("authReducer/register", async (data, { rejectWithValue }) => {
    try {
        let response = await axios.post("/auth/register", data)
        if (response.status >= 400) {
            return rejectWithValue(response)
        }
        return response.data
    } catch (error: any) {
        return rejectWithValue(error?.message)
    }
})

export const register_reducers = {
    pending: (state: AuthState) => {
        state.loading = true
    },
    rejected: (state: AuthState, error: PayloadAction<any>) => {
        state.loading = false
        state.error = error.payload
    },
    fulfilled: (state: AuthState) => {
        state.loading = false
    }
}

export default register