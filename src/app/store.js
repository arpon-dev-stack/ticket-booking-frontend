import { configureStore } from "@reduxjs/toolkit";
import userApi from '../app/userSlice/userApi'
import busListApi from "./busSlice/busListApi";
import busDetailApi from "./busSlice/busDetailApi";
import { paymentApi } from "./busSlice/paymentApi";
import user from "./userSlice/user";

const store = configureStore({
    reducer: {
        [user.reducerPath]: user.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [busListApi.reducerPath]: busListApi.reducer,
        [busDetailApi.reducerPath]: busDetailApi.reducer,
        [paymentApi.reducerPath]: paymentApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, busListApi.middleware, busDetailApi.middleware, paymentApi.middleware)
})

export default store;