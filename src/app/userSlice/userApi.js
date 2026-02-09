import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import activeConfig from "../../utils/app";

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${activeConfig}/user`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        signin: builder.mutation({
            query: (userData) => ({
                url: '/signin',
                method: 'POST',
                body: userData
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.token) {
                        localStorage.setItem('token', data?.token);
                    }
                } catch (error) {
                    console.log('SignIn failed', error);
                }
            },
        }),
        signUp: builder.mutation({
            query: (userData) => ({
                url: '/signup',
                method: 'POST',
                body: userData
            })
        }),
        signOut: builder.mutation({
            query: (userData) => ({
                url: '/signout',
                method: 'POST',
                body: userData
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    localStorage.setItem('token', data?.token);
                } catch (error) {
                }
            }
        }),
        verify: builder.mutation({
            query: () => ({
                url: '/verify',
                method: 'POST',
                skip: !localStorage.getItem('token')
            })
        })
    })
})

export default userApi;
export const { useSignUpMutation, useSigninMutation, useSignOutMutation, useVerifyMutation } = userApi;