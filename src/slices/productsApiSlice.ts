import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const productsApiSlice  = apiSlice.injectEndpoints({
    endpoints: (builder: any)=> ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5
        }),
        getProductDetails: builder.query({
            query: (productId: string)=> ({
                url:`${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 5
        })
    })
});
export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;