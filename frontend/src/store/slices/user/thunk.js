import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import { userActions } from "./userSlice";

export const getUser = createAsyncThunk("getUser", async ({ payload }, thunkAPI) => {
    const options = {
        url: `${process.env.REACT_APP_API_URL}/login`,
        method: "POST",
        data: payload
    };
    try {
        const response = await Axios(options);
        const data = response?.data;

        thunkAPI.dispatch(userActions.setItem({ item: data }));

        return data
    } catch (e) {
        return thunkAPI.rejectWithValue({
            error: true,
            code: e.response?.data?.error?.code,
            message: "SomethingWentWrong",
        });
    }
});

export const getUserByEmail = createAsyncThunk("getUserByEmail", async ({ email }, thunkAPI) => {
    const options = {
        url: `${process.env.REACT_APP_API_URL}/getUser`,
        method: "GET",
        params: { email },
    };
    try {
        const response = await Axios(options);
        const data = response?.data;

        thunkAPI.dispatch(userActions.setItem({ item: data }));

        return data
    } catch (e) {
        return thunkAPI.rejectWithValue({
            error: true,
            code: e.response?.data?.error?.code,
            message: "SomethingWentWrong",
        });
    }
});

export const logoutUser = createAsyncThunk("logoutUser", async ({ }, thunkAPI) => {
    try {
        thunkAPI.dispatch(userActions.setToEmpty());
        return true
    } catch (e) {
        return thunkAPI.rejectWithValue({
            error: true,
            message: "SomethingWentWrong",
        });
    }
});
