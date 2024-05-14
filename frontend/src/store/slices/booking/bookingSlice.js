import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    booking: {},
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setToEmpty(state) {
            state.booking = {}
        },
        setBooking(state, action) {
            state.booking = action.payload.item;
        }
    },
});

export const bookingActions = bookingSlice.actions;
export default bookingSlice.reducer;

