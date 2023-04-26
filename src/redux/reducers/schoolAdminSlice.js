import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    schoolAdminName : '',
    schoolName: '',
    role: '',
}

export const schoolAdminSlice = createSlice({
    name: 'schoolAdmin',
    initialState,
    reducers: {
        setSchoolAdminInfo: (state, action) => {
            console.log(action,'hit in reducer');
            // localStorage.setItem('schoolAdminToken', action.payload.token)
            state.schoolAdminName = action.payload.schoolAdminName
            state.schoolName = action.payload.schoolName
            state.role = action.payload.role
        },
    },
})

export const { setSchoolAdminInfo } = schoolAdminSlice.actions

export const schoolAdminReducer =  schoolAdminSlice.reducer

export const selectSchoolAdminLogin = (state)=> state.schoolAdmin
