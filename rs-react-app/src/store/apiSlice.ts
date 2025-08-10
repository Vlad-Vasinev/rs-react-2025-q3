import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { BerriesQuery, BerryDate } from "../types/types";

export const apiSlice = createApi({
  reducerPath: 'api', 
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/berry' }),
  endpoints: (builder) => ({
    getBerries: builder.query<BerriesQuery, void>({
      query: () => ''
    }),
    getBerryPagination: builder.query<BerriesQuery, number>({
      query: (offset) => `?limit=10&offset=${offset}`
    }),
    getSpecific: builder.query<BerryDate, number | string | undefined>({
      query: (offset) => `/${offset}`
    })
  })
})

export const { useGetBerriesQuery, useGetBerryPaginationQuery, useGetSpecificQuery, useLazyGetSpecificQuery } = apiSlice