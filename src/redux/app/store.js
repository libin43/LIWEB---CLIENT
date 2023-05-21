import { configureStore } from '@reduxjs/toolkit'
import { schoolAdminReducer } from '../reducers/schoolAdminSlice';
import { schoolAdminApiSlice } from '../../api/schoolAdmin/apiSlice';
import { facultyApiSlice } from '../../api/faculty/apiSlice';
import { facultyReducer } from '../reducers/facultySlice';

const store = configureStore({
    reducer: {
        [schoolAdminApiSlice.reducerPath]: schoolAdminApiSlice.reducer,
        [facultyApiSlice.reducerPath]: facultyApiSlice.reducer,
        schoolAdmin: schoolAdminReducer,
        faculty: facultyReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(schoolAdminApiSlice.middleware)
    .concat(facultyApiSlice.middleware),
})

export default store;