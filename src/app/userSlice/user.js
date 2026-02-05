import { createSlice } from "@reduxjs/toolkit";
import userApi from '../userSlice/userApi'

const user = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        token: null,
        user: null,
        role: null
    },
    reducers: {
        setUser: (state, actions) => {
            if (actions.payload.success) {
                state.isAuthenticated = true;
                state.token = actions.payload.token;
                state.user = actions.payload.user;
            } else {
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(userApi.endpoints.signin.matchFulfilled, (state, { payload }) => {
            state.isAuthenticated = true;
            state.user = payload.user.id;
            state.token = payload.token;
            localStorage.setItem('token', payload.token);
        }).addMatcher(userApi.endpoints.signOut.matchFulfilled, (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        }).addMatcher(userApi.endpoints.verify.matchFulfilled, (state, actions) => {
            state.isAuthenticated = true;
            state.user = actions.payload.id;
            state.role = actions.payload.role;
            state.token = localStorage.getItem('token');
        })
    }
})

export default user.reducer;
export const { setUser } = user.actions;