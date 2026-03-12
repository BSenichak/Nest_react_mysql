import { Box, Button, styled, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
    let navigate = useNavigate()
    return (
        <Wrapper>
            <Typography variant='h1'>404</Typography>
            <Typography variant='h2'>Page not founnd</Typography>
            <Button onClick={() => navigate("/")}>Go Home</Button>
        </Wrapper>
    )
}

const Wrapper = styled(Box)({
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
})
