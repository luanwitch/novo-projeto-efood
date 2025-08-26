import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  Restaurante,
  CardapioItem,
  PurchasePayload,
  PurchaseResponse
} from '../../src/types'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ebac-fake-api.vercel.app/api/efood'
  }),
  endpoints: (builder) => ({
    getRestaurantsProduct: builder.query<Restaurante[], void>({
      query: () => 'restaurantes'
    }),

    getRestaurantById: builder.query<Restaurante, number>({
      query: (id) => `restaurantes/${id}`
    }),

    getDishById: builder.query<
      CardapioItem,
      { restaurantId: number; dishId: number }
    >({
      query: ({ restaurantId, dishId }) =>
        `restaurantes/${restaurantId}/cardapio/${dishId}`
    }),
    purchase: builder.mutation<PurchaseResponse, PurchasePayload>({
      query: (body) => ({
        url: 'checkout',
        method: 'POST',
        body
      })
    })
  })
})

export const {
  useGetRestaurantsProductQuery,
  useGetRestaurantByIdQuery,
  useGetDishByIdQuery,
  usePurchaseMutation
} = api

export default api
