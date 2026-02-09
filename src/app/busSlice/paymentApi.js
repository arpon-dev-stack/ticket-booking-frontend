import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import activeConfig from '../../utils/app';

export const paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${activeConfig}/payment`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        applyPayment: builder.mutation({
            query: ({ busId, seat, departureDate }) => ({
                url: '/',
                method: 'POST',
                body: { busId, seat, departureDate, }
            })
        })
    })
});

export const { useApplyPaymentMutation } = paymentApi;