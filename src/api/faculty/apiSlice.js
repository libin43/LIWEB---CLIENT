import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../constants'

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
        headers.set('authorization', `Bearer ${localStorage.getItem('facultyToken')}`);
        return headers;
    }
})
export const facultyApiSlice = createApi({
    reducerPath: 'facultyApi',
    baseQuery,
    tagTypes: ['faculty', 'academicYear', 'class', 'student', 'subject', 'exam', 'result'],
    endpoints: (build) => ({
        facultyLogin: build.mutation({
            query: (data) => ({
                url: '/auth/faculty/login',
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['faculty'],
        }),
        getFacultyData: build.query({
            query: () => '/faculty/get_info',
            providesTags: ['faculty']
        }),
        facultyGetAcademicYear: build.query({
            query: () => '/faculty/get_academic_year',
            providesTags: ['faculty','academicYear']
        }),
        facultyGetExamSchedule: build.query({
            query: (selectedYearID) => `/faculty/exam_schedule/${selectedYearID}`,
            providesTags: ['faculty','subject','exam']
        }),
        facultyGetExamConductedClasses: build.query({
            query: ({selectedSubjectID, selectedExamID}) => `/faculty/get_exam_conducted_classes/subject?subjectId=${selectedSubjectID}&examId=${selectedExamID}`,
            providesTags: ['faculty','subject','exam','result']
        }),
        facultyGetStudentsByClassID: build.query({
            query: ({classID,subjectID,examID}) => `/faculty/students_in_class/students?classId=${classID}&subjectId=${subjectID}&examId=${examID}`,
            providesTags: ['faculty','class','student','subject','exam']
        }),
        facultySubmitExamResult: build.mutation({
            query: (data) => ({
                url: '/faculty/submit_exam_result',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['result'],
        }),
        facultyGetClassIncharges: build.query({
            query: (selectedYearID) => `/faculty/class_view_incharge/${selectedYearID}`,
            providesTags: ['faculty','class']
        }),
        facultyGetStudentTotalExamResults: build.query({
            query: (classId) => `/faculty/class_student_overall_exam_result/${classId}`,
            providesTags: ['faculty','class','student']
        }),
        facultyGetClassByAcademicYear: build.query({
            query: (academicYearID) => `/faculty/get_class_room/${academicYearID}`,
            providesTags: ['faculty','academicYear','class']
        }),
        facultyPromoteStudents: build.mutation({
            query: (data) => ({
                url: '/faculty/initiate_student_promotion',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['students'],
        }),
        facultyDashboardStatistics: build.query({
            query: (academicYearID) => `/faculty/dashboard_statistics/${academicYearID}`,
            providesTags: ['faculty','student','class','subject'],
        }),
        facultyUploadImage: build.mutation({
            query: (formData) => ({
                url: '/faculty/upload_pro_pic',
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags: ['faculty'],
        }),
        facultyRemoveImage: build.mutation({
            query: (data) => ({
                url: `/faculty/remove_pro_pic/${data}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['faculty'],
        }),
        facultyUpdateProfile:  build.mutation({
            query: (data) => ({
                url: 'faculty/update_profile',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['faculty'],
        }),
        facultyViewExamResult : build.query({
            query: ({classID,subjectID,examID}) => `/faculty/subject_exam_result/students?classId=${classID}&subjectId=${subjectID}&examId=${examID}`,
            providesTags: ['faculty','student','class','result'],
        }),
        }),
    })


export const {
    useFacultyLoginMutation,
    useGetFacultyDataQuery,
    useFacultyGetAcademicYearQuery,
    useFacultyGetExamScheduleQuery,
    useFacultyGetExamConductedClassesQuery,
    useFacultyGetStudentsByClassIDQuery,
    useFacultySubmitExamResultMutation,
    useFacultyGetClassInchargesQuery,
    useFacultyGetStudentTotalExamResultsQuery,
    useFacultyGetClassByAcademicYearQuery,
    useFacultyPromoteStudentsMutation,
    useFacultyDashboardStatisticsQuery,
    useFacultyUploadImageMutation,
    useFacultyRemoveImageMutation,
    useFacultyUpdateProfileMutation,
    useFacultyViewExamResultQuery,
} = facultyApiSlice