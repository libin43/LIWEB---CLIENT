import { createSlice } from "@reduxjs/toolkit";

const facultyToken = localStorage.getItem('facultyToken') ?? '';
const parsedData = facultyToken ? facultyToken: null;

const initialState ={
    facultyToken: parsedData ?? {facultyToken: ''},
    academicYearID: '',
    optedYear: {id: '', startDate: '', endDate: ''},
    classID: '',
}

export const facultySlice = createSlice({
    name: 'faculty',
    initialState,
    reducers: {
        setFaultyToken: (state, action) => {
            localStorage.setItem('facultyToken',action.payload.token);
            state.facultyToken = action.payload.token;
        },
        setAcademicYearID: (state, action) => {
            state.optedYear.id = action.payload.id
            state.optedYear.startDate = action.payload.startDate
            state.optedYear.endDate = action.payload.endDate
        },
        setClassID: (state, action) => {
            state.classID = action.payload.classID;
        },
        clearFacultyToken: (state) => {
            state.facultyToken = '';
            localStorage.removeItem('facultyToken')
        }
    },
})

export const { setFaultyToken, setAcademicYearID, setClassID, clearFacultyToken } = facultySlice.actions

export const facultyReducer =  facultySlice.reducer

export const selectFaculty = (state)=> state.faculty


