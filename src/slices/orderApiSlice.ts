import { ORDERS_URL, PAYPAL_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    createOrder: builder.mutation({
      query: (order: any) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order }
      })
    }),
    getOrderDetails: builder.query({
      query: (id: string) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }: {orderId: string, details: any}) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: details
      })
    }),
    getPayPalCliendId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
       keepUnusedDataFor: 5,
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
export const { useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalCliendIdQuery } = ordersApiSlice;