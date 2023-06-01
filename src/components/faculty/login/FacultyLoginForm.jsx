import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {toast} from 'react-toastify';
import { Spinner } from 'flowbite-react';
import { setFaultyToken } from '../../../redux/reducers/facultySlice';
import { useFacultyLoginMutation } from '../../../api/faculty/apiSlice';



const FacultyLoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [facultyLogin] = useFacultyLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const data = JSON.stringify({ email, password });

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };
      
    const handleLogin = async (e) =>{
        e.preventDefault();
        setIsLoading(true);
        try{
            const res = await facultyLogin(data).unwrap()
            console.log(res,'faculty logged in');
            if (res.success) {

                dispatch(setFaultyToken(res))
                toast.success('signin success!', {
                  position: "bottom-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  });
                navigate('/faculty/home');
              }
        }
        catch (error) {
            console.log(error);
            setIsLoading(false)
            if (error.code === 'ERR_NETWORK') {
                console.log('Server is down');
            }
            else if (error.status === 401) {
                setPasswordError(true)
                setTimeout(() => {
                    setPasswordError(false);
                }, 3000);
            }
            else if (error.status === 400) {
                setEmailError(true)
                setTimeout(() => {
                    setEmailError(false);
                }, 3000);
            }
            else {
                console.log(error, 'RTK error');
            }
        }
    }
  return (
    <div>
        <>
  {/* component */}
  <link
    rel="stylesheet"
    href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css"
  />
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
    <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
    <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
        Liweb Manage School
      </div>
      {/* <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
        Login To Your Account
      </div> */}
      {/* <button className="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200">
        <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500">
          <i className="fab fa-facebook-f" />
        </span>
        <span>Login with Facebook</span>
      </button> */}
      <div className="relative mt-10 h-px bg-gray-300">
        <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
          <span className="bg-white px-4 text-xs text-gray-500 uppercase">
            Login With Email
          </span>
        </div>
      </div>
      <div className="mt-10">
        <form onSubmit={handleLogin}>
          <div className="flex flex-col mb-6">
            <label
              htmlFor="email"
              className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
            >
              E-Mail Address:
            </label>
            <div className="relative">
              <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                id="email"
                type="email"
                name="email"
                className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                placeholder="E-Mail Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="emailError">
              {
                emailError ?
                <p className="text-xs italic text-red-500">
                Email doesnot exist
                </p>
                :
                null
              }
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-6">
            <label
              htmlFor="password"
              className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
            >
              Password:
            </label>
            <div className="relative">
              <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {
                passwordError ?
                <p className="text-xs italic text-red-500">
                Password doesnot match
                </p>
                :
                null
              }
            </div>
            <div className="show_password">
            <input type="checkbox" onClick={toggleShowPassword} /> Show Password
            </div>
          </div>
          <div className="flex items-center mb-6 -mt-4">
            <div className="flex ml-auto">
              <a
                href="#"
                className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700"
              >
                Forgot Your Password?
              </a>
            </div>
          </div>

          {
          isLoading ?
                <div className="text-center">
                <Spinner aria-label="Center-aligned spinner example" />
                </div>
                :
          <div className="flex w-full">    
            <button
              type="submit"
              className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
            >
              <span className="mr-2 uppercase">Login</span>
              <span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </button>
            </div>
            }
        </form>
      </div>
    </div>
  </div>
</>
    </div>
  )
}

export default FacultyLoginForm