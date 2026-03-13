import { AppBar, Container } from '@mui/material'

export default function Footer() {
  return (
    <AppBar position='static' sx={(theme=>({
        background: theme.palette.primary.dark        
    }))}>
        <Container>
            &copy; Bohdan Senychak {new Date().getFullYear()}
        </Container>
    </AppBar>
  )
}
