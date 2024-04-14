import { configureStore } from "@reduxjs/toolkit"

import loginReducer from "./slices/login/loginSlice"
import rentReducer from "./slices/rent/rentSlice"

const store = configureStore({
    reducer: {
        login: loginReducer,
        rent: rentReducer
    }
})

export default store