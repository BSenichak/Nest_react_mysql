import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, styled, TextField, IconButton, InputAdornment, CircularProgress } from "@mui/material"
import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useForm, Controller } from "react-hook-form"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../Store/store";
import { useNavigate } from "react-router-dom";
import register from "../Store/auth/register";
import { clearError } from "../Store/auth/authReducer";
import { useSnackbar } from 'notistack';

export default function RegisterPage() {
    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            email: "",
            password: "",
            name: "",
            username: "",
            repeated_password: ""
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
        let result = await dispatch(register(data))
        if (result?.type.split("/")[2] == "fulfilled") {
            navigate("/login")
        }
    }

    return (
        <Wrapper>
            <Card component={"form"} onSubmit={handleSubmit(submit)}>
                <CardHeader title={"Register"} />
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
                        name="name"
                        control={control}
                        rules={{
                            required: "Name is required",
                            minLength: {
                                value: 2,
                                message: "Name should be longer than 2 letters"
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Name"
                                variant="outlined"
                                error={!!errors?.name}
                                helperText={(errors?.name?.message as string) || ""}
                            />
                        )}
                    />
                    <Controller
                        name="username"
                        control={control}
                        rules={{
                            required: "Username is required",
                            minLength: {
                                value: 5,
                                message: "Username should be longer than 5 letters"
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Username"
                                variant="outlined"
                                error={!!errors?.name}
                                helperText={(errors?.name?.message as string) || ""}
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
                    <Controller
                        name="repeated_password"
                        control={control}
                        rules={{
                            required: "Repeated password is required",
                            validate: (value): any => {
                                if (watch("password") !== value) return "Passwords is not equal"
                                return null
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Password"
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                error={!!errors?.repeated_password}
                                helperText={(errors?.repeated_password?.message as string) || ""}
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
                    <Button variant="contained" startIcon={loading ? <CircularProgress size="small" /> : <LoginIcon />} disabled={loading} fullWidth type="submit">Register</Button>
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
