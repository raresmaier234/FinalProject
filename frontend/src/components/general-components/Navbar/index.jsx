import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import StyledButton from '../StyledButton';
import SigninForm from '../../forms/SigninForm';
import LoginForm from '../../forms/LoginForm';

const Appbar = (props) => {

    const [openSignInModal, setOpenSignInModal] = useState(false)
    const [openLogInModal, setOpenLogInModal] = useState(false)

    return (
        <>
            <Box sx={{ flexGrow: 1, color: 'red' }}>
                <AppBar position="static"
                    sx={{
                        flexGrow: 1,
                        backgroundColor: 'white',
                    }}>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                color: 'black'
                            }}>

                        </Typography>
                        <StyledButton
                            component="label"
                            variant="contained"
                            onClick={() => { setOpenSignInModal(true) }}>Sign In</StyledButton>
                        <StyledButton
                            component="label"
                            variant="contained"
                            onClick={() => { setOpenLogInModal(true) }}>
                            Log In
                        </StyledButton>
                        <StyledButton component="label" variant="contained" onClick={() => { }}>
                            Favourites
                        </StyledButton>
                    </Toolbar>
                </AppBar>
            </Box >

            <SigninForm isOpen={openSignInModal} onClose={() => setOpenSignInModal(false)} />
            <LoginForm isOpen={openLogInModal} onClose={() => setOpenLogInModal(false)} />
        </>

    );
}

export default Appbar