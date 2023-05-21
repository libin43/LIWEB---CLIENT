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
        getAllStudentsByClass: build.query({
            query: ({selectClass, currentPage, itemsPerPage}) => `/school_admin/get_students/pagination?&page=${currentPage}&limit=${itemsPerPage}&classID=${selectClass}`,
            providesTags: ['schoolAdmin','student']
        }),
        getAllStudentsBySearch: build.query({
            query: ({selectClass, currentFilterPage, itemsPerPage, searchKey}) => `/school_admin/get_students/search_pagination?&page=${currentFilterPage}&limit=${itemsPerPage}&classID=${selectClass}&searchKey=${searchKey}`,
            providesTags: ['schoolAdmin','student']
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
        getSubjectsByClass: build.query({
            query: ({selectedClassID, currentPage, itemsPerPage}) => `/school_admin/get_class_subjects/pagination?&page=${currentPage}&limit=${itemsPerPage}&classID=${selectedClassID}`,
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
        blockUnblockStudent: build.mutation({
            query: (data) => (console.log(data,'data in blcok'),{
                url: '/school_admin/access_control_student',
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['student'],
        }),
        getDashboardStatistics: build.query({
            query: () => '/school_admin/dashboard_statistics',
            providesTags: ['schoolAdmin','students','faculty','class']
        }),
        getDashboardAdmissionGraph: build.query({
            query: ({startIndex}) => `/school_admin/dashboard_admission_graph/page?skip=${startIndex}`,
            providesTags: ['schoolAdmin','students']
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
    useGetClassByAcademicYearQuery,
    useAddAcademicYearMutation,
    useGetSchoolAdminDataQuery,
    useAddClassMutation,
    useAddStudentMutation,
    useGetAllStudentsByClassQuery,
    useGetAllStudentsBySearchQuery,
    useAddSubjectMutation,
    useGetSubjectByAcademicYearQuery,
    useGetSubjectsByClassQuery,
    useAddExamMutation,
    useBlockUnblockStudentMutation,
    useGetDashboardStatisticsQuery,
    useGetDashboardAdmissionGraphQuery,
} = schoolAdminApiSlice