import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: {},
    quantity: 0,
};

const rentSlice = createSlice({
    name: "rent",
    initialState,
    reducers: {
        setToEmpty(state, action) {
            state.items = {}
            state.quantity = 0
        },
        setItem(state, action) {
            state.items = action.payload.items
            state.quantity = this.length(state.items)
        }
    },
});

export const loginActions = rentSlice.actions;
export default rentSlice.reducer;