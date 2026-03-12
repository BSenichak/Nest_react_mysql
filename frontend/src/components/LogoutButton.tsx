import { ListItemButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { logout } from "../Store/auth/authReducer";
import type { RootState, AppDispatch } from "../Store/store";


export default function LogoutButton() {
    let navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()
    const userInfo = useSelector<RootState, RootState["auth"]["userInfo"]>(state => state.auth.userInfo)
    if (!!userInfo) return (
        <ListItemButton onClick={() => {
            dispatch(logout())
            navigate("/")
        }}
            sx={{ flexGrow: 0 }}>
            Logout
        </ListItemButton>
    )
    return null
}