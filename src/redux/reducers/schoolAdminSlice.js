import { createSlice } from "@reduxjs/toolkit";
const schoolAdminToken = localStorage.getItem('schoolAdminToken') ?? '';
const parsedData = schoolAdminToken ? schoolAdminToken: null;

const initialState ={
    schoolAdminToken:  parsedData ?? {schoolAdminToken: ''},
    schoolAdminName : '',
    schoolName: '',
    role: '',  
}

export const schoolAdminSlice = createSlice({
    name: 'schoolAdmin',
    initialState,
    reducers: {
        setSchoolAdminToken: (state, action) => {
            localStorage.setItem('schoolAdminToken',action.payload.token);
            state.schoolAdminToken = action.payload.token;
        },
        setSchoolAdminInfo: (state, action) => {
            state.schoolAdminName = action.payload.schoolAdminName
            state.schoolName = action.payload.schoolName
            state.role = action.payload.role
        },
        clearSchoolAdminToken: (state) => {
            state.schoolAdminToken = '';
            localStorage.removeItem('schoolAdminToken')
        }
    },
})

export const { setSchoolAdminToken, setSchoolAdminInfo, clearSchoolAdminToken } = schoolAdminSlice.actions

export const schoolAdminReducer =  schoolAdminSlice.reducer

export const selectSchoolAdmin = (state)=> state.schoolAdmin
