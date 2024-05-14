// BookingForm.js
import React, { useState, useEffect } from "react";
import { getRentById } from "../../store/slices/rent/thunk";
import { useParams } from "react-router-dom";
import {
    TextField,
    Button,
    Grid,
    MenuItem,
    Container,
    Typography,
    Paper
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FormLayout from "../../containers/FormLayout";
import { addBooking } from "../../store/slices/booking/thunk";
import { useAuth } from "../../providers/AuthProvider";
import { getUserByEmail } from "../../store/slices/user/thunk";


const BookingForm = () => {
    const { rentId } = useParams();
    const rent = useSelector((state) => state.rent.items);
    const userInfo = useSelector((state) => state.user.user);

    const { user, logout } = useAuth();


    const dispatch = useDispatch();
    console.log(userInfo)


    const [form, setForm] = useState({
        rentId: parseInt(rentId, 10),
        userId: userInfo.id,
        nrOfRooms: 1,
        nrOfPersons: 1,
        startDate: "",
        endDate: "",
        bookingStatus: "PENDING",
        totalPrice: 0
    });

    useEffect(() => {
        dispatch(getRentById({ id: rentId }));
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            dispatch(getUserByEmail({ email: user }));
        }
    }, [user, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const calculateTotalPrice = () => {
        const start = new Date(form.startDate);
        const end = new Date(form.endDate);
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const roomCost = form.nrOfRooms * rent.price * nights;
        const personCost = form.nrOfPersons * rent.price * nights;
        return roomCost + personCost;
    };

    useEffect(() => {
        if (form.startDate && form.endDate) {
            const totalPrice = calculateTotalPrice();
            setForm(prevForm => ({ ...prevForm, totalPrice }));
        }
    }, [form.startDate, form.endDate, form.nrOfRooms, form.nrOfPersons]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form)
        dispatch(addBooking({ booking: form }))
    };

    return (
        <Container maxWidth="sm" style={{ paddingTop: "100px" }}>
            <Paper style={{ padding: 16 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Create a Booking
                </Typography>
                <FormLayout onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Start Date"
                                type="date"
                                name="startDate"
                                value={form.startDate}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="End Date"
                                type="date"
                                name="endDate"
                                value={form.endDate}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Number of Rooms"
                                type="number"
                                name="nrOfRooms"
                                value={form.nrOfRooms}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Number of Persons"
                                type="number"
                                name="nrOfPersons"
                                value={form.nrOfPersons}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Total Price"
                                type="number"
                                name="totalPrice"
                                value={form.totalPrice}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button variant="contained" color="primary" type="submit">
                                Create Booking
                            </Button>
                        </Grid>
                    </Grid>
                </FormLayout>
            </Paper>
        </Container>
    );
};

export default BookingForm;
