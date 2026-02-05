import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/user' }),
    endpoints: (builder) => ({
        signin: builder.mutation({
            query: (userData) => ({
                url: '/signin',
                method: 'POST',
                body: userData
            })
        }),
        signUp: builder.mutation({
            query: (userData) => ({
                url: '/signup',
                method: 'POST',
                body: userData
            })
        }),
        signOut: builder.mutation({
            query: () => ({
                url: '/signout',
                method: 'POST'
            })
        }),
        verify: builder.mutation({
            query: (authData) => ({
                url: '/verify',
                method: 'POST',
                body: authData
            })
        }),
    })
})

export default userApi;
export const { useSignUpMutation, useSigninMutation, useSignOutMutation, useVerifyMutation } = userApi;