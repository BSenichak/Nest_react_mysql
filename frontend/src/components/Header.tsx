import { AppBar, Container, Typography, Box, styled, List } from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import HomeIcon from '@mui/icons-material/Home';
import Link, { type LinkProps } from "./Link";


export default function Header() {
    let links: Array<LinkProps> = [
        {
            title: "Home",
            link: "/",
            icon: <HomeIcon />
        },
        {
            title: "Login",
            link: "/login",
        },
        {
            title: "Register",
            link: "/register"
        }
    ]
    return (
        <AppBar component={"header"} position="static">
            <Container>
                <Wrapper>
                    <ListAltIcon sx={(theme) => ({ fontSize: theme.typography.h3 })} />
                    <Typography variant="h4">Todo app</Typography>
                    <Nav>
                        {links.map((item: LinkProps) => <Link key={item.link} link={item.link} title={item.title} icon={item.icon} />)}
                    </Nav>
                </Wrapper>
            </Container>
        </AppBar>
    )
}



const Wrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(2),
    padding: theme.spacing(1),
    alignItems: "center"
}))

const Nav = styled(List)(({ theme }) => ({
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'end',
    gap: theme.spacing(1)
}))