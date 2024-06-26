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
    }),
    getMyOrders: builder.query({
        query: () => ({
        url: `${ORDERS_URL}/myorders`,
          method: 'GET',
        }),
        keepUnusedDataFor: 5
    }),
    getOrders: builder.query({
        query: ()=> ({
            url:ORDERS_URL
        }),
        keepUnusedDataFor: 5
    }),
    deliverOrder: builder.mutation({
      query: (orderId: string) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method:'PUT'
      })
    })
  })
});
export const { useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalCliendIdQuery, useGetMyOrdersQuery, useGetOrdersQuery, useDeliverOrderMutation } = ordersApiSlice;