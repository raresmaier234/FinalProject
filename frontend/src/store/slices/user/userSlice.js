import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: "user",
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

export const userActions = userSlice.actions;
export default userSlice.reducer;