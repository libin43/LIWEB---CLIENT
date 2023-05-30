import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useSchoolAdminLoginMutation } from '../../../api/schoolAdmin/apiSlice';
import { useDispatch } from 'react-redux';
import { setSchoolAdminToken } from '../../../redux/reducers/schoolAdminSlice';
import {toast} from 'react-toastify';

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [login] = useSchoolAdminLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const data = JSON.stringify({ email, password });



  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await login(data).unwrap()
      console.log(res,'its response from login');
      if (res.success) {
        dispatch(setSchoolAdminToken(res))
        toast.success(' signin success!', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        navigate('/school_admin/dashboard');
      }
    }
    catch (error) {
      setIsLoading(false)
      console.log(error);
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


  // console.log(watch('schoolName')); Logs data similar to onchange event


  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          {/* Row */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* Col */}
            <div
              className="w-full h-5/6 bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  'url("https://img.freepik.com/free-vector/student-graduation-cap-using-computer-desk_1262-21421.jpg?w=996&t=st=1680357138~exp=1680357738~hmac=cbef920ef449661c9e554ea78e4d68e36eeebc3d94b1fbdd21ab446cdc0c7ce6")'
              }}
            />
            {/* Col */}
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-4xl text-center">Liweb Manage School</h3>
              <h3 className="pt-4 text-2xl text-center">Login</h3>
              <form id='form' className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit}>

                <div className="mb-4 ">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Email ID"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
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
                <div className="mb-4">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="******************"
                      name="password"
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
                    <input type="checkbox" onClick={toggleShowPassword} /> Show Password
                  </div>
                </div>

                <div className="mb-6 text-center">
                  {
                    isLoading ?
                      <div className="text-center">
                        <div role="status">
                          <svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                      :
                      <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Login
                      </button>
                  }
                </div>

                <hr className="mb-6 border-t" />
                {/* <div className="text-center">
            <a
              className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div> */}
                <div className="text-center">
                  <Link
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    to={'/school_admin/otp'}
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="text-center my-3">
                  <Link
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    to={'/school_admin/signup'}
                  >
                    Dont have an account ? Create account
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default LoginForm