import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
// @ts-ignore
import {createLogger} from "redux-logger"
import auth from "./auth/authReducer"
import tasks from "./tasks/tasksReducer"
import "../axios"

const logger = createLogger({ collapsed: true, duration: true, timestamp: true })

const store = configureStore({
    reducer: {
        auth,
        tasks
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(logger)
    },

})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>

export default store
