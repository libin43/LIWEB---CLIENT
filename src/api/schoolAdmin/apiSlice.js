import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../constants'

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json');
        return headers;
    }
})
export const schoolAdminApiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['schoolAdmin', 'faculty'],
    endpoints: (build) => ({
        schoolAdminSignup: build.mutation({
            query: (data) => ({
                url: '/school_admin/signup',
                method: 'POST',
                body: data,
            })
        }),
        schoolAdminLogin: build.mutation({
            query: (data) => ({
                url: '/auth/school_admin/login',
                method: 'POST',
                body: data,
            })
        }),
        verifyEmailForOtp: build.mutation({
            query: (data) => ({
                url: '/otp/verify_info',
                method: 'POST',
                body: data,
            })
        }),
        verifyOtp: build.mutation({
            query: (data) => ({
                url: '/otp/verify_otp',
                method: 'POST',
                body: data,
            })
        }),
        addFaculty: build.mutation({
            query: (data) => ({
                url: '/faculty/addFaculty',
                method: 'POST',
                body: data,
            })
        }),
        getFacultyDropDown: build.query({
            query: () => '/faculty/getFaculty',
            providesTags: ['schoolAdmin','faculty']
        })
    })
})

export const {
    useSchoolAdminSignupMutation,
    useSchoolAdminLoginMutation,
    useVerifyEmailForOtpMutation,
    useVerifyOtpMutation,
    useAddFacultyMutation,
    useGetFacultyDropDownQuery,
} = schoolAdminApiSlice