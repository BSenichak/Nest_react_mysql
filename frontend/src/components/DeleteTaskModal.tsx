import { Cancel, Delete } from "@mui/icons-material";
import { Card, Modal, CardHeader, CardActions, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../Store/store";
import deleteTask from "../Store/tasks/deleteTask";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function EditTaskModal({ open, onClose }: { open: boolean, onClose: (() => void) }) {
    const dispatch = useDispatch<AppDispatch>()
    let task = useSelector<RootState, RootState["tasks"]["task"]>(state => state.tasks.task)
    let navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    let handleDelete = useCallback(async () => {
        if (task) {
            let result = await dispatch(deleteTask(task?.id))
            if (result.type.split("/")[2] == "fulfilled") {
                enqueueSnackbar({
                    message: "Delete successful",
                    variant: "success",
                    autoHideDuration: 3000
                })
                navigate("/")
                onClose()
            }
        }
    }, [])
    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Card sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                }}>
                    <CardHeader title="Are you shore u want delete this task" />
                    <CardActions>
                        <Button startIcon={<Delete />} fullWidth color="error" variant="contained" onClick={handleDelete}>Remove</Button>
                        <Button startIcon={<Cancel />} color="primary" variant="outlined" onClick={onClose}>Cancel</Button>
                    </CardActions>
                </Card>
            </Modal >
        </>
    )
}
