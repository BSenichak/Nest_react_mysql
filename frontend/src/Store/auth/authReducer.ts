import { createSlice, } from '@reduxjs/toolkit'
import getUserInfo, { getAllUsers_reducers } from './getUserInfo';
import login, {login_reducers} from './login';

export type InitialState = {
    userInfo: {
        username: string
        name: string,
        email: string,
    } | null
    loading: boolean
    error: null | string
}


const initialState: InitialState = {
    userInfo: null,
    loading: false,
    error: null
}

const authReducer = createSlice({
    name: "authReducer",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getUserInfo.pending, getAllUsers_reducers.pending)
        builder.addCase(getUserInfo.rejected, getAllUsers_reducers.rejected)
        builder.addCase(getUserInfo.fulfilled, getAllUsers_reducers.fulfilled)
        builder.addCase(login.pending, login_reducers.pending)
        builder.addCase(login.rejected, login_reducers.rejected)
        builder.addCase(login.fulfilled, login_reducers.fulfilled)
    },
});

export const { } = authReducer.actions

export default authReducer.reducer