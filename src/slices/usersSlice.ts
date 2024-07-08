import { USER_PROFILE_URL, LOGOUT_URL, REGISTER_URL, LOGIN_URL, USERS_URL } from '../constants';
import { apiSlice } from "./apiSlice";
import { UserType } from './authSlice';


export interface AuthInfo {
    name?: string;
    email: string;
    password: string;
}

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
        loginUser: builder.mutation({
            query: (data: AuthInfo) => ({
                url: `${LOGIN_URL}`,
                method: 'POST',
                body: data
            }),
            keepUnusedDataFor: 5
        }),
        registerUser: builder.mutation({
            query: (data: AuthInfo) => ({
                url: `${REGISTER_URL}`,
                method: 'POST',
                body: data
            }),
            keepUnusedDataFor: 5
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: `${LOGOUT_URL}`,
                method: 'POST'
            }),
            keepUnusedDataFor: 5
        }),
        profile: builder.mutation({
            query: (data: any) => ({
                url: USER_PROFILE_URL,
                method: 'PUT',
                body: data,
            }),
            keepUnusedDataFor: 5
        }),
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
        deleteUser: builder.mutation({
            query: (userId: string) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
            }),
        }),
        getUserDetails: builder.query({
            query: (userId: string) => ({
                url: `${USERS_URL}/${userId}`
            }),
            keepUnusedDataFor: 5
        }),
        updateUser: builder.mutation({
            query: (data: UserType) => ({
                url: `${USERS_URL}/${data._id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
    }),

});
export const { useLoginUserMutation, useLogoutUserMutation, useRegisterUserMutation, useProfileMutation, useGetUsersQuery, useDeleteUserMutation, useGetUserDetailsQuery, useUpdateUserMutation
} = usersApiSlice;