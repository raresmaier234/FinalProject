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
        },
        addReview(state, action) {
            state.items.push(action.payload);
        },
        updateReview(state, action) {
            const index = state.items.findIndex(review => review.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        }
    },
});

export const reviewsActions = reviewsSlice.actions;
export default reviewsSlice.reducer;

