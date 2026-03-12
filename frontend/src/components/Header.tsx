/**
 * Header component that displays the application navigation bar.
 * 
 * Renders an AppBar with the application title and navigation links.
 * The navigation links are dynamically generated from the links array.
 * 
 * @returns {JSX.Element} The header component with AppBar, title, and navigation
 * 
 * @example
 * ```tsx
 * <Header />
 * ```
 */
import { AppBar, Container, Typography, Box, styled, List, ListItemButton, ListItemIcon } from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate, useLocation } from "react-router-dom"
import React, { useCallback } from "react";
import type { Theme } from "@mui/material/styles";
import HomeIcon from '@mui/icons-material/Home';

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

interface LinkProps {
    link: string;
    title: string;
    icon?: React.ReactNode
}
/**
 * Navigation button component for the header
 * 
 * Renders a clickable list item button that navigates to a specified route.
 * The button's background color changes based on whether the current location
 * matches the link's destination (active state).
 * 
 * @param {LinkProps} props - The component props
 * @param {string} props.link - The route path to navigate to
 * @param {string} props.title - The display text for the button
 * @param {ReactElement} props.icon - Icon right on the right (not required)
 * 
 * @returns {JSX.Element} A styled ListItemButton with navigation functionality
 * 
 * @example
 * ```tsx
 * <Link link="/dashboard" title="Dashboard" />
 * ```
 */
function Link({ link, title, icon }: LinkProps) {
    let navigate = useNavigate()
    let location = useLocation()

    let goTo = useCallback(() => {
        navigate(link)
    }, [])
    let setButtonColor = (theme: Theme) => ({ backgroundColor: location.pathname == link ? theme.palette.primary.dark : theme.palette.primary.main })

    return (
        <ListItemButton onClick={goTo} sx={(theme) => ({ ...setButtonColor(theme), flexGrow: 0 })}>
            {!!icon && <ListItemIcon>{icon}</ListItemIcon>}
            {title}
        </ListItemButton>
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