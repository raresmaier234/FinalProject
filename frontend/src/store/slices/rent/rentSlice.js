import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: {},
    quantity: 0,
};

const rentSlice = createSlice({
    name: "rent",
    initialState,
    reducers: {
        setToEmpty(state) {
            state.items = {}
            state.quantity = 0
        },
        setItem(state, action) {
            state.items = action.payload.item;
            state.quantity = Object.keys(state.items).length;
        }
    },
});

export const rentActions = rentSlice.actions;
export default rentSlice.reducer;