import { createSlice, } from '@reduxjs/toolkit'
import getUserInfo, { getAllUsers_reducers } from './getUserInfo';
import login, {login_reducers} from './login';
import register, {register_reducers} from './register';

export type InitialState = {
    userInfo: {
        username: string
        name: string,
        email: string,
        id: number
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
    reducers: {
        clearError: (state: InitialState)=>{
            state.error = null
        },
        logout: (state: InitialState)=> {
            state.userInfo = null
            localStorage.removeItem("token")
        }
    },
    extraReducers(builder) {
        builder.addCase(getUserInfo.pending, getAllUsers_reducers.pending)
        builder.addCase(getUserInfo.rejected, getAllUsers_reducers.rejected)
        builder.addCase(getUserInfo.fulfilled, getAllUsers_reducers.fulfilled)
        builder.addCase(login.pending, login_reducers.pending)
        builder.addCase(login.rejected, login_reducers.rejected)
        builder.addCase(login.fulfilled, login_reducers.fulfilled)
        builder.addCase(register.pending, register_reducers.pending)
        builder.addCase(register.rejected, register_reducers.rejected)
        builder.addCase(register.fulfilled, register_reducers.fulfilled)
    },
});

export const { clearError, logout } = authReducer.actions

export default authReducer.reducer