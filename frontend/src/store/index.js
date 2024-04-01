import { configureStore } from "@reduxjs/toolkit"

import loginReducer from "./slices/login/loginSlice"

const store = configureStore({
    reducer: {
        login: loginReducer
    }
})

export default store