import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../app/userSlice/user';
import userApi from '../app/userSlice/userApi'
import { busApi } from "./busSlice/busApi";

const store = configureStore({
    reducer: {
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer,
        [busApi.reducerPath]: busApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(userApi.middleware, busApi.middleware)
})

export default store;