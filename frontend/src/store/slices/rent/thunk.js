import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import { rentActions } from "./rentSlice"

export const getAllRents = createAsyncThunk("getAllRents", async ({ payload }, thunkAPI) => {
    const options = {
        url: `${process.env.REACT_APP_API_URL}/availableRents`,
        method: "GET",
        data: payload
    };
    try {
        const response = await Axios(options);
        const data = response?.data;

        thunkAPI.dispatch(rentActions.setItem({ items: data }));

        return true
    } catch (e) {
        return thunkAPI.rejectWithValue({
            error: true,
            code: e.response?.data?.error?.code,
            message: "SomethingWentWrong",
        });
    }
});