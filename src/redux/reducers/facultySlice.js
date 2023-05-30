import { createSlice } from "@reduxjs/toolkit";
console.log('fac reducer hitting');

const facultyToken = localStorage.getItem('facultyToken') ?? '';
const parsedData = facultyToken ? facultyToken: null;

const initialState ={
    facultyToken: parsedData ?? {facultyToken: ''},
    academicYearID: '',
    classID: '',
}

export const facultySlice = createSlice({
    name: 'faculty',
    initialState,
    reducers: {
        setFaultyToken: (state, action) => {
            localStorage.setItem('facultyToken',action.payload.token);
            console.log(action,'hit in reducer of faculty');
            // localStorage.setItem('schoolAdminToken', action.payload.token)
            state.facultyToken = action.payload.token;
        },
        setAcademicYearID: (state, action) => {
            console.log(action,'hit in reducer of academic year');
            state.academicYearID = action.payload.id;
        },
        setClassID: (state, action) => {
            console.log(action,'hit in reducer of class');
            state.classID = action.payload.classID;
        },
        clearFacultyToken: (state) => {
            state.facultyToken = '';
            localStorage.removeItem('facultyToken')
            console.log('fac token removed');
        }
    },
})

export const { setFaultyToken, setAcademicYearID, setClassID, clearFacultyToken } = facultySlice.actions

export const facultyReducer =  facultySlice.reducer

export const selectFaculty = (state)=> state.faculty


