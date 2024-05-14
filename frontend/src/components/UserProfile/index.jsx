import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Grid,
    Container,
    Typography,
    Paper,
    Avatar
} from '@mui/material';
import { useAuth } from '../../providers/AuthProvider';
import { getUserByEmail } from '../../store/slices/user/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [form, setForm] = useState({
        id: '',
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        password: '',
        role: ''
    });

    const userInfo = useSelector((state) => state.user.user);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    useEffect(() => {
        if (user) {
            dispatch(getUserByEmail({ email: user }));
        }
    }, [user, dispatch]);

    useEffect(() => {
        if (userInfo) {
            setForm({
                id: userInfo.id,
                email: userInfo.email,
                phone: userInfo.phone,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                password: '',
                role: userInfo.role
            });
            setIsLoading(false);
        }
    }, [userInfo]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Container maxWidth="sm" style={{ paddingTop: 100 }}>
            <Paper style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar style={{ height: '100px', width: '100px', marginBottom: 16 }} src="/static/images/avatar/1.jpg" />
                <Typography variant="h4" align="center" gutterBottom>
                    User Profile
                </Typography>
                {isLoading ? (
                    <Typography align="center">Loading...</Typography>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">First Name: {form.firstName}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Last Name: {form.lastName}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Email: {form.email}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Phone: {form.phone}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Role: {form.role}</Typography>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Button variant="contained" color="primary" type="submit">
                                    Update Profile
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Paper>
        </Container>
    );
};

export default UserProfile;
