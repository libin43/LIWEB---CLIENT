import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../constants'

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
        headers.set('authorization', `Bearer ${localStorage.getItem('schoolAdminToken')}`);
        headers.set('Content-Type', 'application/json')
        return headers;
    }
})
export const schoolAdminApiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['schoolAdmin', 'faculty', 'academicYear', 'class', 'student'],
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
            }),
            invalidatesTags: ['schoolAdmin'],
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
        getSchoolAdminInfo: build.query({
            query: () => '/school_admin/getInfo',
            providesTags: ['schoolAdmin']
        }),
        addFaculty: build.mutation({
            query: (data) => ({
                url: '/faculty/addFaculty',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['faculty'],
        }),
        getFacultyAcademicYearDropDown: build.query({
            query: () => '/school_admin/get_faculty_academic_year',
            providesTags: ['schoolAdmin','faculty','academicYear']
        }),
        getAcademicYear: build.query({
            query: () => '/school_admin/get_academic_year',
            providesTags: ['schoolAdmin','academicYear']
        }),
        getClassByAcademicYear: build.mutation({
            query: (data) => ({
                url: '/school_admin/get_class_room',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['schoolAdmin','academicYear','class'],
        }),
        addAcademicYear: build.mutation({
            query: (data) => ({
                url: '/school_admin/addAcademicYear',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['academicYear'],
        }),
        addClass: build.mutation({
            query: (data) => ({
                url: '/school_admin/add_class',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['class'],
        }),
        addStudent: build.mutation({
            query: (data) => ({
                url: '/student/add_student',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['student'],
        }),
        addSubject: build.mutation({
            query: (data) => ({
                url: '/school_admin/add_subject',
                method: 'POST',
                body: data
            })
        })
    })
})

export const {
    useSchoolAdminSignupMutation,
    useSchoolAdminLoginMutation,
    useVerifyEmailForOtpMutation,
    useVerifyOtpMutation,
    useAddFacultyMutation,
    useGetFacultyAcademicYearDropDownQuery,
    useGetAcademicYearQuery,
    useGetClassByAcademicYearMutation,
    useAddAcademicYearMutation,
    useGetSchoolAdminInfoQuery,
    useAddClassMutation,
    useAddStudentMutation,
    useAddSubjectMutation,
} = schoolAdminApiSlice