import { useSelector } from "react-redux"
import type { RootState } from "../Store/store"
import { Box, styled, Typography } from "@mui/material"

export default function MainPage() {
    let userInfo = useSelector<RootState, RootState["auth"]["userInfo"]>(state => state.auth.userInfo)
    if (userInfo) return (
        <Wrapper>
            <Typography variant="h3">Hello {userInfo.name}</Typography>
            <Typography variant="h5">Your username is: {userInfo.username}</Typography>
            <Typography variant="h5">Your email is: {userInfo.email}</Typography>
            <Typography variant="h5">Your ID is: {userInfo.id}</Typography>
        </Wrapper>
    )
    else return (
        <Wrapper>
            <Typography variant="h1">You need login first</Typography>
        </Wrapper>)
}

const Wrapper = styled(Box)({
    minHeight: "90vh",
})
