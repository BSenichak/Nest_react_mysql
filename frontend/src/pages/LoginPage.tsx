import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, styled, TextField, IconButton, InputAdornment, CircularProgress } from "@mui/material"
import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useForm, Controller } from "react-hook-form"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../Store/store";
import login from "../Store/auth/login";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../Store/auth/getUserInfo";
import { clearError } from "../Store/auth/authReducer";
import { useSnackbar } from 'notistack';

export default function LoginPage() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const [showPassword, setShowPassword] = useState(false)

    const { enqueueSnackbar } = useSnackbar();
    let dispatch = useDispatch<AppDispatch>()
    let { loading, error } = useSelector<RootState, RootState["auth"]>((state) => state.auth)

    let navigate = useNavigate()

    useEffect(() => {

        error && enqueueSnackbar(error, {
            variant: "error",
            autoHideDuration: 2000,
            onExit: () => dispatch(clearError())
        });
    }, [error, enqueueSnackbar, dispatch]);

    const submit = async (data: any) => {
        let result = await dispatch(login(data))
        if (result?.type.split("/")[2] == "fulfilled") {
            navigate("/")
            dispatch(getUserInfo())
        }
    }

    return (
        <Wrapper>
            <Card component={"form"} onSubmit={handleSubmit(submit)}>
                <CardHeader title={"Login"} />
                <Divider />
                <CardContent sx={(theme) => ({ display: "flex", flexDirection: "column", gap: theme.spacing(1) })}>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm,
                                message: "Email is invalid"
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Email"
                                variant="outlined"
                                error={!!errors?.email}
                                helperText={(errors?.email?.message as string) || ""}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: "Password is required"
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Password"
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                error={!!errors?.password}
                                helperText={(errors?.password?.message as string) || ""}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                </CardContent>
                <Divider />
                <CardActions>
                    <Button variant="contained" startIcon={loading ? <CircularProgress size="small" /> : <LoginIcon />} disabled={loading} fullWidth type="submit">Login</Button>
                </CardActions>
            </Card>
        </Wrapper>
    )
}

const Wrapper = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
})
