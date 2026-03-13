import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import type { AppDispatch, RootState } from "../Store/store"
import { useEffect, useState } from "react"
import getOneTask from "../Store/tasks/getOneTask"
import { Box, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Divider, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import { Delete, Edit } from "@mui/icons-material"
import { clearTask, clearTasksError } from "../Store/tasks/tasksReducer"
import EditTaskModal from "../components/EditTaskModal"
import DeleteTaskModal from "../components/DeleteTaskModal"

export default function TaskPage() {
    let location = useLocation()
    let { loading, error, task } = useSelector<RootState, RootState["tasks"]>(s => s.tasks)
    let { enqueueSnackbar } = useSnackbar()
    useEffect(() => {
        if (error) enqueueSnackbar({ message: error, autoHideDuration: 3000, variant: 'error', onClose: () => dispatch(clearTasksError()) })
    }, [error])
    let dispatch = useDispatch<AppDispatch>()
    let task_id: number = Number(location.pathname.split("/")[2])
    useEffect(() => {
        dispatch(getOneTask(task_id))
    }, [])

    useEffect(() => {
        return () => {
            dispatch(clearTask())
        }
    }, [])

    const [editModalState, setEditModalState] = useState<boolean>(false)
    const [deleteModalState, setDeleteModalState] = useState<boolean>(false)

    if (loading) return <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center", alignItems: "center" }}><CircularProgress /></Box>
    else if (!task) return <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
        <Typography>404 Task not found</Typography>
    </Box>
    return (
        <Card sx={{ position: "relative", mt: 2 }}>
            <CardHeader title={"Task: " + task.title} subheader={new Date(task.datetime).toUTCString()} />
            <Divider />
            <CardContent>
                Description: {task.content}
            </CardContent>
            <Divider />
            <CardActions>
                <Button startIcon={<Delete />} variant="contained" color="error" onClick={() => setDeleteModalState(true)}>Remove</Button>
                <Button startIcon={<Edit />} variant="contained" color="primary" fullWidth onClick={() => setEditModalState(true)}>Edit</Button>
            </CardActions>
            <EditTaskModal open={editModalState} onClose={() => setEditModalState(false)} />
            <DeleteTaskModal open={deleteModalState} onClose={() => setDeleteModalState(false)} />
        </Card>
    )
}


