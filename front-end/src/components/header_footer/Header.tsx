import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import logo from "../../assets/logo1.png"
import {Link} from "react-router-dom";

export function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{
            backgroundColor: '#FDB0C0',
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        component="img"
                        sx={{ height: 64, }}
                        alt="LoF Logo"
                        src={ logo }
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        League of Friendship
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            <Link style={{ textDecoration: 'none' }} to={"/"}>
                                <Button
                                    key='dashboard'
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: 'white', display: 'block'}}>
                                    Dashboard
                                </Button>
                            </Link>
                            <Link style={{ textDecoration: 'none' }} to={"/teams"}>
                                <Button
                                    key='home'
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: 'white', display: 'block'}}>
                                    Teams
                                </Button>
                            </Link>
                            <Link style={{ textDecoration: 'none' }} to={"/admin"}>
                                <Button
                                    key='Admin'
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: 'white', display: 'block'}}>
                                    Admin
                                </Button>
                            </Link>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LoF
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <Link style={{ textDecoration: 'none' }} to={"/"}>
                            <Button
                                key='dashboard'
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}>
                                Dashboard
                            </Button>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to={"/teams"}>
                            <Button
                                key='home'
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}>
                                Teams
                            </Button>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to={"/admin"}>
                            <Button
                                key='Admin'
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}>
                                Admin
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
