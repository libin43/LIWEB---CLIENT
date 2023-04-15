import dotenv from 'dotenv'

export const baseURL = 'http://localhost:3000/api/v1'

//School Admin
export const schoolAdminSignup = '/api/v1/school_admin/signup'
export const schoolAdminLogin = '/api/v1/auth/school_admin/login'
export const verifyEmailForOtp = '/api/v1/otp/verify_info'
export const verifyOtp = '/api/v1/otp/verify_otp'