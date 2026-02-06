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
    getBus: builder.query({
      query: (busId) => `buses/${busId}`,

      async onQueryStarted(busId, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedBus } = await queryFulfilled;

          dispatch(
            busApi.util.updateQueryData('getBuses', undefined, (draft) => {
              const index = draft.buses.findIndex(b => b.id === busId || b._id === busId);

              if (index !== -1) {

                draft.buses[index] = updatedBus;
              } else {

                draft.buses.push(updatedBus);
              }
            })
          );
        } catch (err) {
        }
      },
    })
  }),
});

export const { useGetBusesQuery, useGetBusQuery } = busApi;