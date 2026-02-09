import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import activeConfig from '../../utils/app';

const busListApi = createApi({
  reducerPath: 'busApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${activeConfig}/bus`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  endpoints: (builder) => ({
    getBuses: builder.query({
      query: ({ page, from, to, date }) => ({
        url: '/',
        params: { page, from, to, date }
      })
    })
  })
});

export const { useLazyGetBusesQuery } = busListApi;
export default busListApi;