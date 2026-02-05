import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const busApi = createApi({
  reducerPath: 'busApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: (builder) => ({
    getBuses: builder.query({
      query: ({ pageNo, from, to, date }) => ({
        url: 'buses',
        params: { pageNo, from, to, date },
      }),
      // This helps with caching:
      providesTags: ['Buses'],
    }),
  }),
});

export const { useGetBusesQuery } = busApi;