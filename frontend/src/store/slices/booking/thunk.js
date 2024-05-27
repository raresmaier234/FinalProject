import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import { bookingActions } from "./bookingSlice"


export const addBooking = createAsyncThunk("addBooking", async ({ booking }, thunkAPI) => {
    const options = {
        url: `${process.env.REACT_APP_API_URL}/addBooking`,
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        data: booking,
    };
    try {
        const response = await Axios(options);
        const data = response?.data;


        thunkAPI.dispatch(bookingActions.setBooking({ booking: data }));

        return true;
    } catch (e) {
        return thunkAPI.rejectWithValue({
            error: true,
            code: e.response?.data?.error?.code,
            message: "Something went wrong",
        });
    }
});

export const getBookings = createAsyncThunk("getBookings", async ({ userId }, thunkAPI) => {
    const options = {
        url: `${process.env.REACT_APP_API_URL}/${userId}/bookings`,
        method: "GET",
    };
    try {
        const response = await Axios(options);
        const data = response?.data;

        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue({
            error: true,
            code: e.response?.data?.error?.code,
            message: "Something went wrong",
        });
    }
});

