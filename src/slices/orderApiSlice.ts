import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const ordersApiSlice  = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    createOrder: builder.mutation({
      query: (order: any) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order }
        })
      })
        // getOrders: builder.query({
        //     query: () => ({
        //         url: ORDERS_URL,
        //     }),
        //     keepUnusedDataFor: 5
        // }),
        // getProductDetails: builder.query({
        //     query: (productId: string)=> ({
        //         url:`${PRODUCTS_URL}/${productId}`
        //     }),
        //     keepUnusedDataFor: 5
        // })
    })
});
export const { useCreateOrderMutation } = ordersApiSlice;