import React,{useState} from 'react'

import axios from '../../utils/axios';
import { schoolAdminLogin } from '../../utils/constants';


const LoginForm = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };


      const body = JSON.stringify({email,password})

      const handleSubmit = (e) => {
        console.log(e,'show');
        e.preventDefault()
        axios.post(schoolAdminLogin,body,{ headers: { "Content-Type":"application/json" }})
        .then((respone)=>{
            console.log(respone);
        })
        .catch((err)=>[
            console.log(err)
        ])
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
                onChange={(e)=>setEmail(e.target.value)}
              />
              <p className="text-xs italic text-red-500">
              {/* {errors.email?.message} */}
              </p>
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
                onChange={(e)=>setPassword(e.target.value)}
              />
              <p className="text-xs italic text-red-500">
              {/* {errors.password?.message} */}
              </p>
              <input type="checkbox" onClick={toggleShowPassword}/> Show Password
            </div>
          </div>
          <div className="mb-6 text-center">
            <button
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
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
            <a
              className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
              href="./index.html"
            >
              Forgot Password?
            </a>
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