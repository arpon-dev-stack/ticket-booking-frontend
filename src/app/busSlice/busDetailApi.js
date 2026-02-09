import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"; // Use /react for hooks
import activeConfig from "../../utils/app";

const busDetailApi = createApi({
    reducerPath: 'busDetailApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${activeConfig}/bus`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getBus: builder.query({
            query: (id) => ({
                url: `/${id}`
            })
        })
    })
});

export default busDetailApi;
export const { useGetBusQuery } = busDetailApi;