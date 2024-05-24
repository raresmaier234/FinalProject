import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import { reviewsActions } from "./reviewSlice"

export const addReview = createAsyncThunk("addReview", async ({ rentId, review }, thunkAPI) => {
    const options = {
        url: `${process.env.REACT_APP_API_URL}/rents/${rentId}/reviews`,
        method: "POST",
        data: review
    };
    try {
        const response = await Axios(options);
        const data = response?.data;

        thunkAPI.dispatch(reviewsActions.setItem({ item: review }));
        return true
    } catch (e) {
        return thunkAPI.rejectWithValue({
            error: true,
            code: e.response?.data?.error?.code,
            message: "SomethingWentWrong",
        });
    }
});

export const getReviews = createAsyncThunk("getReviews", async ({ rentId }, thunkAPI) => {
    const options = {
        url: `${process.env.REACT_APP_API_URL}/rents/${rentId}/reviews`,
        method: "GET",
    };
    try {
        const response = await Axios(options);
        const data = response?.data;

        thunkAPI.dispatch(reviewsActions.setItem({ item: data }));
        return true
    } catch (e) {
        return thunkAPI.rejectWithValue({
            error: true,
            code: e.response?.data?.error?.code,
            message: "SomethingWentWrong",
        });
    }
});
