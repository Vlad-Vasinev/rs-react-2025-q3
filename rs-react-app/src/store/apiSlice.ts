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

//Errors emulation:

// 1) use https://pokeapi.co/api/v2/berrydfdf wrong request to get "Bad Request" error
// 2) use contentBlock.tsx(line 72) 'trigger('unknown berry request')' call this to get "Bad Request" error
// 3) type some not existig berry into input field to get "Not Found" error

// you might wanna see Preloader more clearly, in that case,
// go to incognito mode, turn down vpn(in case if you're from russia)
// pokeapi can't fetch data without vpn, so, now you can see Preloader is running