import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import type { InitialState } from "./authReducer"

/**
 * Get all users from server
 */
const getAllUsers = createAsyncThunk("authReducer/getAllUsers", async (_, {rejectWithValue}) => {
    try {
        let responce = await axios.get("/users")
        if (responce.status >= 400) {
            return rejectWithValue(responce)
        }
        return responce.data
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
        state.users = []
    },
    rejected: (state: InitialState, error: PayloadAction<any>) => {
        state.loading = false
        state.users = []
        state.error = error.payload
    } ,
    fullfuled: (state: InitialState, action: PayloadAction<Array<any>>) => {
        state.loading = false
        state.users = action.payload
    }
}


export default getAllUsers