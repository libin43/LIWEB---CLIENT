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
    tagTypes: ['schoolAdmin', 'faculty', 'academicYear', 'class', 'student', 'subject', 'exam'],
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
        getSchoolAdminData: build.query({
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
        addAcademicYear: build.mutation({
            query: (data) => ({
                url: '/school_admin/addAcademicYear',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['academicYear'],
        }),
        getFacultyAcademicYearDropDown: build.query({
            query: () => '/school_admin/get_faculty_academic_year',
            providesTags: ['schoolAdmin','faculty','academicYear']
        }),
        getAcademicYear: build.query({
            query: () => '/school_admin/get_academic_year',
            providesTags: ['schoolAdmin','academicYear']
        }),
        // getClassByAcademicYear: build.mutation({
        //     query: (data) => ({
        //         url: '/school_admin/get_class_room',
        //         method: 'POST',
        //         body: data,
        //     }),
        //     invalidatesTags: ['schoolAdmin','academicYear','class'],
        // }),
        addClass: build.mutation({
            query: (data) => ({
                url: '/school_admin/add_class',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['class'],
        }),
        getClassByAcademicYear: build.query({
            query: (academicYearID) => `/school_admin/get_class_room/${academicYearID}`,
            providesTags: ['schoolAdmin','academicYear','class']
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
            }),
            invalidatesTags: ['subject'],
        }),
        getSubjectByAcademicYear: build.query({
            query: (academicYearID) => `/school_admin/get_subject/${academicYearID}`,
            providesTags: ['schoolAdmin','academicYear','subject']
        }),
        addExam: build.mutation({
            query: (data) => ({
                url: '/school_admin/add_exam',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['exam'],
        }),
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
    // useGetClassByAcademicYearMutation,
    useGetClassByAcademicYearQuery,
    useAddAcademicYearMutation,
    useGetSchoolAdminDataQuery,
    useAddClassMutation,
    useAddStudentMutation,
    useAddSubjectMutation,
    useGetSubjectByAcademicYearQuery,
    useAddExamMutation,
} = schoolAdminApiSlice