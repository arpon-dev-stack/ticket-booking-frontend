import { createSlice } from "@reduxjs/toolkit";
import userApi from "./userApi";

const user = createSlice({
    name: 'user',
    initialState: {
        isAuthenticated: false,
        role: 'guest'
    },
    reducers: {
        restartUser: (state) => {
            state.isAuthenticated = false;
            state.role = 'guest';
        }
    },
    extraReducers: builder => {
        builder.addMatcher(userApi.endpoints.signin.matchFulfilled, (state, payload) => {
            state.isAuthenticated = true;
            state.role = payload.role
        }).addMatcher(userApi.endpoints.signOut.matchFulfilled, (state, payload) => {
            state.isAuthenticated = false;
            state.role = 'guest'
        }).addMatcher(userApi.endpoints.verify.matchFulfilled, (state, payload) => {
            state.isAuthenticated = true;
            state.role = payload.role;
        }).addMatcher(userApi.endpoints.verify.matchRejected, (state, payload) => {
            state.isAuthenticated = false;
            state.role = 'guest';
        })
    }
})

export default user;
export const {restartUser} = user.actions;