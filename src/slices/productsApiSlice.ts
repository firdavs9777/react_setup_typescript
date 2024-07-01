import { ProductType } from "../components/Product/ProductData";
import { PRODUCTS_URL, UPLOADS_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const productsApiSlice  = apiSlice.injectEndpoints({
    endpoints: (builder: any)=> ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5,
        providesTags: ['Products'],
        }),
        getProductDetails: builder.query({
            query: (productId: string)=> ({
                url:`${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 5
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST'
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: ( product: ProductType) => ({
                url: `${PRODUCTS_URL}/${product._id}`,
                method: 'PUT',
                body: product
            }),
        invalidatesTags: ['Products']
        }),
         uploadProductImage: builder.mutation({
            query: (data:any) => ({
                url: UPLOADS_URL,
                method: 'POST',
                body: data
            }),
        }),
    deleteProduct: builder.mutation({
            query: (productId: string) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',         
            }),
        }),
    })
});
export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation,useUploadProductImageMutation, useDeleteProductMutation} = productsApiSlice;