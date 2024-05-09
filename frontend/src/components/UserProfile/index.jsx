// UserProfile.js
import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Grid,
    Container,
    Typography,
    Paper
} from '@mui/material';
import { useAuth } from '../../providers/AuthProvider';
import { getUser } from '../../store/slices/login/thunk';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

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

    // const userInfo = useSelector((state) => state.user)

    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    const { user } = useAuth();

    console.log(user)
    // setForm({
    //     id: userInfo.id,
    //     email: userInfo.email,
    //     phone: userInfo.phone,
    //     firstName: userInfo.firstName,
    //     lastName: userInfo.lastName,
    //     password: '',
    //     role: userInfo.role
    // });

    // useEffect(() => {
    //     dispatch(getUser({ payload: user }))
    // }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Container maxWidth="sm">
            <Paper style={{ padding: 16 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    User Profile
                </Typography>
                {isLoading ? (
                    <Typography align="center">Loading...</Typography>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Role"
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                    InputProps={{ readOnly: true }}
                                />
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
