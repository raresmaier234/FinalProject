import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import StyledButton from '../StyledButton';
import LoginForm from '../../forms/LoginForm';
import SigninForm from '../../forms/SignupForm';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByEmail, logoutUser } from '../../../store/slices/user/thunk';
import { useAuth } from '../../../providers/AuthProvider';


export const Search = styled('div')(({ theme }) => ({
    gap: "20px",
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: "1px solid black",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },

    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));


export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',

    },
}));

export default function Appbar() {

    const { user, logout } = useAuth()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const userInfo = useSelector((state) => state.user.user)

    const [openLoginModal, setOpenLoginModal] = useState(false)
    const [openRegisterModal, setOpenRegisterModal] = useState(false)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfile = () => {
        navigate("/profile")
    }

    const handleLogout = () => {
        dispatch(logoutUser({}));
        logout()
        navigate("/")
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleNotifications = () => {
        navigate('/notifications')
    }

    useEffect(() => {
        dispatch(getUserByEmail({ email: user }))
    }, [])

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {user ? (
                [
                    <MenuItem key="profile" onClick={handleProfile}>Profile</MenuItem>,
                    <MenuItem key="logout" onClick={handleLogout}>Log out</MenuItem>
                ]
            ) : (
                [
                    <MenuItem key="login" onClick={() => { setOpenLoginModal(true) }}>Log In</MenuItem>,
                    <MenuItem key="register" onClick={() => { setOpenRegisterModal(true) }}>Register</MenuItem>
                ]
            )}
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    color="inherit"
                >
                    <Badge color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    {user ? <Avatar>H</Avatar>
                        : <AccountCircle />}
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            Travel Buddy
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: 'flex', margin: '20px', gap: '20px' }}>
                            <Link to="/">
                                <StyledButton>
                                    Home
                                </StyledButton>
                            </Link>
                            <Link to="/trips">
                                <StyledButton>
                                    Rents
                                </StyledButton>
                            </Link>
                            {userInfo !== null && userInfo.role === "RENTER" &&
                                <>
                                    <Link to="/createRent">
                                        <StyledButton>
                                            Create Rent
                                        </StyledButton>
                                    </Link>
                                    <Link to="/pending-bookings">
                                        <StyledButton>
                                            Bookings
                                        </StyledButton>
                                    </Link>
                                </>}
                        </Box>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Link to="/messenger">
                                    <Badge badgeContent={4} color="error">
                                        <MailIcon color="disabled" />
                                    </Badge>
                                </Link>

                            </IconButton>
                            <IconButton
                                size="large"
                                color="inherit"
                                onClick={handleNotifications}
                            >
                                <Badge color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                {user ? <Avatar></Avatar> : <AccountCircle />}
                            </IconButton>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </Box>
            <LoginForm isOpen={openLoginModal} onClose={() => setOpenLoginModal(false)}></LoginForm>
            <SigninForm isOpen={openRegisterModal} onClose={() => setOpenRegisterModal(false)}></SigninForm>
        </>
    );
}