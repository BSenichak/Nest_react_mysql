import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import type { InitialState } from "./authReducer"

/**
 * Get all users from server
 */
const getUserInfo = createAsyncThunk("authReducer/getUserInfo", async (_, {rejectWithValue}) => {
    try {
        let response = await axios.get("/users")
        if (response.status >= 400) {
            return rejectWithValue(response)
        }
        return response.data
    } catch (error: any) {
        return rejectWithValue(error?.message)
    }
})

/**
 * Reducers for handling the getAllUsers async thunk states.
 * Manages loading state, user data, and error handling across pending, rejected, and fulfilled actions.
 */
export const getAllUsers_reducers = {
    pending: (state: InitialState) => {
        state.loading = true
        state.userInfo = null
    },
    rejected: (state: InitialState, error: PayloadAction<any>) => {
        state.loading = false
        state.error = error.payload
    } ,
    fulfilled: (state: InitialState, action: PayloadAction<any>) => {
        state.loading = false
        state.userInfo = action.payload
    }
}


export default getUserInfo