import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ButtonWithHover from '../Button';
import SignIn from './SignIn';
import SignOut from './SignOut'

export default function Appbar() {

    return (
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
                        Tripadvisor de pe Wish
                    </Typography>
                    <SignIn></SignIn>
                    <ButtonWithHover label="Fav" handleClick={SignIn} st="btnMargin"></ButtonWithHover>
                    <ButtonWithHover label="Sign Out" handleClick={SignOut} st="btnMargin"></ButtonWithHover>
                </Toolbar>
            </AppBar>
        </Box >
    );
}
