import React, { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../utils/axios';
import {urls} from '../../utils/api'
import { useVerifyEmailForOtpMutation, useVerifyOtpMutation } from '../../api/schoolAdmin/apiSlice';

const OtpForm = () => {
    const [isOtpInputDisplayed, setisOtpInputDisplayed] = useState(false)
    const [email,setEmail] = useState('')
    const [otpRecievedEmail,setOtpRecievedEmail] = useState('')
    const [error,setError] = useState(false)
    const [otpError,setOtpError] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [verifyEmail, {err}] = useVerifyEmailForOtpMutation();
    const [verifyOtp, {otpErr}] = useVerifyOtpMutation();
    const navigate = useNavigate()

    const inputRef1 = useRef('')
    const inputRef2 = useRef('')
    const inputRef3 = useRef('')
    const inputRef4 = useRef('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const data = JSON.stringify({email})
        try{
            const res = await verifyEmail(data).unwrap();
            console.log(res);
            const {email} = res.response.otpRecievedEmail
            setOtpRecievedEmail(email)
            setisOtpInputDisplayed(!isOtpInputDisplayed)
        }
        catch(error) {
            console.log(error);
            setIsLoading(false)
            if(error?.status === 400){
                setError(true)
                setTimeout(() => {
                    setError(false);  
                  }, 3000);
            }
        }
        
        // axios.post(urls.verifyEmailForOtp,body,{ headers: { "Content-Type":"application/json" } })
        // .then((response) => {
        //    console.log(response);
        //    const {email} = response.data.response.otpRecievedEmail
        //    setOtpRecievedEmail(email)
        //    setisOtpInputDisplayed(!isOtpInputDisplayed)
        // }).catch((err)=>{
        //     console.log(err);
        //     setIsLoading(false)
        //     if(err.response?.status === 400){
        //         setError(true)
        //     }
            
        // })
    }

    const handleInputChange = (e) => {
        console.log(e.target.value.length);
        if(e.target.value.length === e.target.maxLength){
            switch (e.target) {
                case inputRef1.current:
                    inputRef2.current.focus();
                    break;
                case inputRef2.current:
                    inputRef3.current.focus();
                    break;
                case inputRef3.current:
                    inputRef4.current.focus();
                    break;        
            }
        }
    }

    const handleOtpSubmit = async (event) => {
        console.log('otp submit called');
        event.preventDefault();
        const otp = `${inputRef1.current.value}${inputRef2.current.value}${inputRef3.current.value}${inputRef4.current.value}`
        const data = JSON.stringify([{otp},{otpRecievedEmail}])
        try{
            const res = await verifyOtp(data).unwrap();
            console.log(res);
            if(res.success){
                localStorage.setItem('token',res.token)
                console.log(res.token);
                navigate('/school_admin/home');
              }
        }
        catch(error){
            console.log(error);
            if(error.status === 401){
                setOtpError(true)
                setTimeout(() => {
                    setOtpError(false);  
                }, 3000);
            }
        }
        // axios.post(urls.verifyOtp,body,{headers: { "Content-Type":"application/json" }})
        // .then((response) => {
        //   console.log(response);
        //   if(response.data.success){
        //     localStorage.setItem('token',response.data.token)
        //     console.log(response.data.token);
        //     navigate('/school_admin/home');
        //   }
        // })
        // .catch((err) => {
        //     console.log(err);
        // })
    }

    return (
        <div>
            <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
                <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                        <div className="flex flex-col items-center justify-center text-center space-y-2">
                            <div className="font-semibold text-3xl">
                                <p>Email Verification</p>
                            </div>
                           
                        </div>
                        <div>
                           
                                <div className="flex flex-col space-y-16">
                                    {
                                        isOtpInputDisplayed ? (
                                            <div>
                                                 <div className="flex flex-row text-sm font-medium text-gray-400">
                                <p>We have sent a code to your email {otpRecievedEmail}</p>
                            </div>
                                               <form onSubmit={handleOtpSubmit}>
                                               <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                                    <div className="w-16 h-16 ">
                                                        <input
                                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                                            type="text"
                                                            name="field1"
                                                            id=""
                                                            maxLength={1}
                                                            ref={inputRef1}
                                                            onChange={handleInputChange}
                                                        

                                                        />
                                                    </div>
                                                    <div className="w-16 h-16 ">
                                                        <input
                                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                                            type="text"
                                                            name="field2"
                                                            id=""
                                                            maxLength={1}
                                                            ref={inputRef2}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="w-16 h-16 ">
                                                        <input
                                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                                            type="text"
                                                            name="field3"
                                                            id=""
                                                            maxLength={1}
                                                            ref={inputRef3}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="w-16 h-16 ">
                                                        <input
                                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                                            type="text"
                                                            name="field4"
                                                            id=""
                                                            maxLength={1}
                                                            ref={inputRef4}
                                                          
                                                        />
                                                    </div>
                                                </div>
                                              
                                                <div className="flex flex-col space-y-5">
                                                {otpError ? 
                                                 <p className="text-xs italic text-red-500">
                                                      Invaid Otp
                                                 </p>
                                                 :
                                                 null
                                                }
                                                    <div>
                                                        <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                                                        type='submit'>
                                                            Verify Account
                                                        </button>
                                                    </div>
                                                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                                        <p>Didn't recieve code?</p>{" "}
                                                        <a
                                                            className="flex flex-row items-center text-blue-600"
                                                            href="http://"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Resend
                                                        </a>
                                                    </div>
                                                </div>
                                                </form>
                                            </div>
                                        ) : (
                                            <form onSubmit={handleSubmit}>
                                            <div className="mb-4 ">
                                                <input
                                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    id="email"
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                {error ? 
                                                 <p className="text-xs italic text-red-500">
                                                      This Email ID is not registered with Liweb
                                                 </p>
                                                 :
                                                 null
                                                }
                                                   

                                                <div>
                                                    {
                                                        isLoading ? 
                                                        <div className="text-center">
                                                        <div role="status">
                                                          <svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                          </svg>
                                                           <span className="sr-only">Loading...</span>
                                                        </div>
                                                      </div> 
                                                      :
                                                      <button
                                                        type='submit'
                                                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                                                        Send OTP
                                                    </button>
                                                    }
                                                    
                                                </div>

                                            </div>
                                            </form>
                                        )
                                    }



                                </div>
                         
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OtpForm