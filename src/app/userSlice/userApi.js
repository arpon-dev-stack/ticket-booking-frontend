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
        })
    })
})

export default userApi;
export const { useSignUpMutation, useSigninMutation } = userApi