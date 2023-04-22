import { configureStore } from '@reduxjs/toolkit'
import { schoolAdminReducer } from '../reducers/schoolAdminSlice';
import { schoolAdminApiSlice } from '../../api/schoolAdmin/apiSlice';

const store = configureStore({
    reducer: {
        [schoolAdminApiSlice.reducerPath]: schoolAdminApiSlice.reducer,
        schoolAdmin: schoolAdminReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(schoolAdminApiSlice.middleware),
})

export default store;