import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    isLoggedIn: false,
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setToEmpty(state, action) {
            state.user = null
            state.isLoggedIn = false
        },
        setItem(state, action) {
            state.user = action.payload.item
            state.isLoggedIn = true
        }
    },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;