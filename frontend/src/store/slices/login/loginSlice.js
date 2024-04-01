import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setToEmpty(state, action) {
            state.user = null
        },
        setItem(state, action) {
            state.user = action.payload.item
        }
    },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;