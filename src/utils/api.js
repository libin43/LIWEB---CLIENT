import axios from './axios';

export const methods = {
      get: 'get',
      post: 'post',  
}

export const urls = {
    //School Admin
    schoolAdminSignup : '/school_admin/signup',
    schoolAdminLogin : '/auth/school_admin/login',
    verifyEmailForOtp : '/otp/verify_info',
    verifyOtp : '/otp/verify_otp',
}

export const sendRequest = async ({
    link,
    id = null,
    data = null,
    operation,
}) => {
    console.log('inside api');
    let url = link;
    if(operation === methods.post) {
        const res = await axios.post( url, data, { headers: { "Content-Type":"application/json" }} );
        return res ;
    }

}