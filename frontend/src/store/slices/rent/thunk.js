import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

import { rentActions } from "./rentSlice"

export const getAllRents = createAsyncThunk("getAllRents", async ({ }, thunkAPI) => {
    const options = {
        url: `${process.env.REACT_APP_API_URL}/getAllRents`,
        method: "GET",
    };
    try {
        const response = await Axios(options);
        const data = response?.data;

        thunkAPI.dispatch(rentActions.setItem({ item: data }));
        return true
    } catch (e) {
        return thunkAPI.rejectWithValue({
            error: true,
            code: e.response?.data?.error?.code,
            message: "SomethingWentWrong",
        });
    }
});

export const getAvailableRents = createAsyncThunk("getAvailableRents", async ({ payload }, thunkAPI) => {
    const options = {
        url: `${process.env.REACT_APP_API_URL}/getAvailableRents`,
        method: "POST",
        data: payload
    };
    try {
        const response = await Axios(options);
        const data = response?.data;

        thunkAPI.dispatch(rentActions.setItem({ item: data }));
        return true
    } catch (e) {
        return thunkAPI.rejectWithValue({
            error: true,
            code: e.response?.data?.error?.code,
            message: "SomethingWentWrong",
        });
    }
});

export const getRentById = createAsyncThunk("getRentById", async ({ id }, thunkAPI) => {
    const options = {
        url: `${process.env.REACT_APP_API_URL}/getRent/${id}`,
        method: "GET",
    };
    try {
        const response = await Axios(options);
        const data = response?.data;

        thunkAPI.dispatch(rentActions.setItem({ item: data }));
        return true
    } catch (e) {
        return thunkAPI.rejectWithValue({
            error: true,
            code: e.response?.data?.error?.code,
            message: "SomethingWentWrong",
        });
    }
});

export const addRent = createAsyncThunk("addRent", async ({ rent }, thunkAPI) => {
    const options = {
        url: `${process.env.REACT_APP_API_URL}/addRent`,
        method: "POST",
        data: rent,
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