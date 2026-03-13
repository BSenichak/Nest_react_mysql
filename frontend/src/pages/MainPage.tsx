import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../Store/store"
import { Box, List, Pagination, SpeedDial, styled, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import getTasks from "../Store/tasks/getTasks"
import Loading from "../components/Loading"
import { useSnackbar } from "notistack"
import type { Task } from "../Store/tasks/tasksReducer"
import TaskButton from "../components/TaskButton"
import { Add } from "@mui/icons-material"
import AddTaskModal from "../components/AddTaskModal"
import { useSearchParams } from "react-router-dom"

export default function MainPage() {
    let { userInfo, error: auth_error, loading: auth_loading } = useSelector<RootState, RootState["auth"]>(state => state.auth)
    let { loading, error, tasks, tasksCount, limit, page } = useSelector<RootState, RootState["tasks"]>(state => state.tasks)
    let dispatch = useDispatch<AppDispatch>()
    let [params, setParams] = useSearchParams()
    useEffect(() => {
        console.log(params)
        if (!!userInfo) dispatch(getTasks(Number(params.get("page")) > 1 ? (Number(params.get("page")) - 1) * limit : null))
    }, [userInfo])

    let { enqueueSnackbar } = useSnackbar()
    useEffect(() => {
        if (error) {
            enqueueSnackbar({ variant: "error", message: error })
        }
        if (auth_error) {
            enqueueSnackbar({ variant: "error", message: auth_error })
        }
    }, [auth_error, error])

    let [addTaskModalState, setAddTaskModalState] = useState<boolean>(false)

    if (!userInfo) return (
        <Wrapper>
            <Typography variant="h1">You need login first</Typography>
        </Wrapper>)
    else if (auth_loading || loading) return <Loading />
    else return (
        <Wrapper>
            <Typography variant="h3" sx={{ mt: 2 }}>Hello, {userInfo.name}</Typography>
            <Typography variant="h5">{tasks.length > 0 ? "There your tasks" : "There must be your tasks, but there empty"}</Typography>
            <List>
                {tasks.map((task: Task, i: number) => (<TaskButton key={task.id} data={task} id={i} />))}
            </List>
            <SpeedDial ariaLabel="Add task" icon={<Add />} sx={(theme) => ({ position: "fixed", bottom: theme.spacing(4), right: theme.spacing(2) })} onClick={() => setAddTaskModalState(true)} />
            <AddTaskModal open={addTaskModalState} onClose={() => setAddTaskModalState(false)} />
            {tasks.length > 0 && (
                <Box sx={{ display: "flex", justifyContent: "center" }}><Pagination
                    count={Math.ceil(tasksCount / limit)}
                    page={page}
                    onChange={(_, n: number) => {
                        dispatch(getTasks((n - 1) * limit))
                        setParams(params => {
                            const newParams = new URLSearchParams(params)
                            newParams.set("page", String(n))
                            return newParams
                        })
                    }}
                /></Box>
            )}
        </Wrapper>
    )
}

const Wrapper = styled(Box)({

})
