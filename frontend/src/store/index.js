import { configureStore } from "@reduxjs/toolkit"

import userReducer from "./slices/user/userSlice"
import rentReducer from "./slices/rent/rentSlice"
import bookingReducer from "./slices/booking/bookingSlice"
import reviewsReducer from "./slices/reviews/reviewSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        rent: rentReducer,
        booking: bookingReducer,
        reviews: reviewsReducer
    }
})

export default store