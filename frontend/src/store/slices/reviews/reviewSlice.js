import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: {},
    quantity: 0,
};

const reviewsSlice = createSlice({
    name: "reviews",
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

export const reviewsActions = reviewsSlice.actions;
export default reviewsSlice.reducer;

