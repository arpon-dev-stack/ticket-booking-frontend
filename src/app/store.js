import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../app/userSlice/user';
import userApi from '../app/userSlice/userApi'

const store = configureStore({
    reducer: {
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(userApi.middleware)
})

export default store;