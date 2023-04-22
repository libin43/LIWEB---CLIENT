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
        setSchoolAdminLogin: (state, action) => {
            console.log(action,'hit in reducer');
            localStorage.setItem('schoolAdminToken', action.payload.token)
            state.schoolAdminName = action.payload.name
            state.schoolName = action.payload.schoolName
            state.role = action.payload.role
        },
    },
})

export const { setSchoolAdminLogin } = schoolAdminSlice.actions

export const schoolAdminReducer =  schoolAdminSlice.reducer

export const selectSchoolAdminLogin = (state)=> state.schoolAdmin
