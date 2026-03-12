import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { InitialState } from "./authReducer";

const login = createAsyncThunk("authReducer/login", async (data, {rejectWithValue}) => {
    try {
        let response = await axios.post("/auth/login", data)
        if (response.status >= 400) {
            return rejectWithValue(response)
        }
        return response.data.access_token
    } catch (error: any) {
        return rejectWithValue(error?.message)
    }
})

export const login_reducers = {
    pending: (state: InitialState) => {
        state.loading = true
    },
    rejected: (state: InitialState, error: PayloadAction<any>) => {
        state.loading = false
        state.error = error.payload
    } ,
    fulfilled: (state: InitialState, action: PayloadAction<string>) => {
        state.loading = false
        localStorage.setItem("token", action.payload)
    }
}

export default login