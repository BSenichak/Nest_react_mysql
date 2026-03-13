import { Cancel, Save } from "@mui/icons-material";
import { Card, Modal, CardHeader, CardContent, CardActions, Button, TextField, Divider } from "@mui/material";
import { useForm, Controller } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../Store/store";
import updateTask from "../Store/tasks/UpdateTask";
import { useSnackbar } from "notistack";

export default function EditTaskModal({ open, onClose }: { open: boolean, onClose: (() => void) }) {
    let task = useSelector<RootState, RootState["tasks"]["task"]>(state => state.tasks.task)
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: task?.title || "",
            content: task?.content || "",
        }
    })
    let dispatch = useDispatch<AppDispatch>()
    let { enqueueSnackbar } = useSnackbar()
    const handleUpdate = async (data: any) => {
        if (!task) return;
        let newData = { ...data, id: task.id }
        let result = await dispatch(updateTask(newData))
        if (result.type.split("/")[2] == "fulfilled") enqueueSnackbar({ message: "Task updated successful", autoHideDuration: 3000, variant: 'success' })
        onClose()
    }
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
                }}
                    component={"form"}
                    onSubmit={handleSubmit(handleUpdate)}
                >
                    <CardHeader title="Edit task" />
                    <Divider />
                    <CardContent sx={(theme) => ({ display: "flex", flexDirection: "column", gap: theme.spacing(2) })}>
                        <Controller
                            name="title"
                            control={control}
                            rules={{
                                required: "Title is required",
                                minLength: {
                                    value: 3,
                                    message: "Title must ne longer then 3 characters"
                                }
                            }}
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    {...field}
                                    label="Title"
                                    variant="outlined"
                                    error={!!errors?.title}
                                    helperText={(errors?.title?.message as string) || ""}
                                />
                            )}
                        />
                        <Controller
                            name="content"
                            control={control}
                            rules={{
                                required: "Content is required",
                                minLength: {
                                    value: 3,
                                    message: "Title must ne longer then 3 characters"
                                }
                            }}
                            render={({ field }) => (
                                <TextField
                                    multiline
                                    fullWidth
                                    {...field}
                                    label="Content"
                                    variant="outlined"
                                    error={!!errors?.content}
                                    helperText={(errors?.content?.message as string) || ""}
                                />
                            )}
                        />

                    </CardContent>
                    <CardActions>
                        <Button startIcon={<Save />} fullWidth color="success" variant="contained" type="submit">Save</Button>
                        <Button startIcon={<Cancel />} color="error" variant="outlined" onClick={onClose}>Cancel</Button>
                    </CardActions>
                </Card>
            </Modal >
        </>
    )
}
