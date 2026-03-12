import { createSlice, } from '@reduxjs/toolkit'
import getAllUsers, { getAllUsers_reducers } from './getAllUsers';

export type InitialState = {
    isLoggined: boolean
    users: Array<any>
    loading: boolean
    error: null | string
}


const initialState: InitialState = {
    isLoggined: false,
    users: [],
    loading: false,
    error: null
}

const authReducer = createSlice({
    name: "authReducer",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAllUsers.pending, getAllUsers_reducers.pending)
        builder.addCase(getAllUsers.rejected, getAllUsers_reducers.rejected)
        builder.addCase(getAllUsers.fulfilled, getAllUsers_reducers.fullfuled)
    },
});

export const { } = authReducer.actions

export default authReducer.reducer