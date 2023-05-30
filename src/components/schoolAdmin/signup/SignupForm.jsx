import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom';

import { useSchoolAdminSignupMutation } from '../../../api/schoolAdmin/apiSlice';

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSchoolNameTakenError,setIsSchoolNameTakenError] = useState(false);
    const [isEmailTakenError,setIsEmailTakenError] = useState(false);
    const [isPhoneTakenError,setIsPhoneTakenError] = useState(false);
    const [signup, {isLoading}] = useSchoolAdminSignupMutation();
    const navigate = useNavigate();
    const { 
        register,handleSubmit, watch, formState: { errors } 
    } = useForm();


    const onSubmit = async (data) =>{
        console.log(register);
        console.log(data);
        try{
          const res = await signup(data).unwrap()
        console.log(res);
        navigate('/school_admin/login')
        }
        catch(error) {
          console.log(error);
          if(error.status === 409){
            if(error.data.error === 'School Name Already Exist'){
              setIsSchoolNameTakenError(true)
              setTimeout(() => {
                setIsSchoolNameTakenError(false);
              }, 3000);
            }
            else if(error.data.error === 'Email Already Exist'){
              setIsEmailTakenError(true)
              setTimeout(() => {
                setIsEmailTakenError(false);
              }, 3000);
            }
            else if(error.data.error === 'Phone Already Exist'){
              setIsPhoneTakenError(true)
              setTimeout(() => {
                setIsPhoneTakenError(false);
              }, 3000);
            }
          }
        }
        
        // axios.post(urls.schoolAdminSignup,data,{ headers: { "Content-Type":"application/json" }})
        // .then((response)=>{
        //   console.log(response,'ressffoodjfaj');
        //   navigate('/school_admin/login')
        // })
        // .catch((err)=>{
        //   console.log(err);
        //   if(err.response.status === 409){
        //     if(err.response.data.error === 'School Name Already Exist'){
        //       setIsSchoolNameTakenError(true)
        //       setTimeout(() => {
        //         setIsSchoolNameTakenError(false);
        //       }, 3000);
        //     }
        //     else if(err.response.data.error === 'Email Already Exist'){
        //       setIsEmailTakenError(true)
        //       setTimeout(() => {
        //         setIsEmailTakenError(false);
        //       }, 3000);
        //     }
        //     else if(err.response.data.error === 'Phone Already Exist'){
        //       setIsPhoneTakenError(true)
        //       setTimeout(() => {
        //         setIsPhoneTakenError(false);
        //       }, 3000);
        //     }
        //   }
        // })
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };




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
        <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
        <form id='form' className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="adminName"
            >
              Admin Name
            </label>
            <input
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="adminName"
              type="text"
              {...register('adminName',{
                required: 'Name is required',
                pattern:{
                    value:/(^[^\s]+(\s[^\s]+)?(\s[^\s]+)?$)/,
                    message:'Enter a valid name'
                },
                minLength:{
                    value: 3,
                    message:'Name must be 3 characters long'
                },

            })}
              placeholder="Enter your name"
            />
              <p className="text-xs italic text-red-500">
              {errors.adminName?.message}
              </p>
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="schoolName"
            >
              School Name
            </label>
            <input
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="schoolName"
              type="text"
              {...register('schoolName',{
                required: 'School is required',
                pattern:{
                    value:/(^[^\s]+(\s[^\s]+)?(\s[^\s]+)?(\s[^\s]+)?$)/,
                    message:'Enter a valid School Name'
                },
                minLength:{
                    value: 3,
                    message:'School Name must be 4 characters long'
                },

            })}
              placeholder="Enter school name"
            />
            {
              isSchoolNameTakenError ?
              <p className="text-xs italic text-red-500">
              School name already exists
              </p>
              :
              null
             } 
              <p className="text-xs italic text-red-500">
              {errors.schoolName?.message}
              </p>
          </div>
          <div className="mb-4 md:flex md:justify-between">
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
                {...register('email',{
                    required: 'Email is required',
                    pattern:{
                        value:/(^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$)/,
                        message:'Enter a valid Email ID'
                    }
    
                })}
                placeholder="Email ID"
              />
              {
              isEmailTakenError ?
              <p className="text-xs italic text-red-500">
              Email already exists
              </p>
              :
              null
             } 
              <p className="text-xs italic text-red-500"> 
              {errors.email?.message}
              </p>
            </div>
            <div className="md:ml-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                {...register('phone',{
                    required: 'Phone Number is required',
                    pattern:{
                        value:/(^[+]?[0-9]{1,3}?[-\s.]?[0-9]{3,4}[-\s.]?[0-9]{4}$)/,
                        message:'Enter a valid phone number'
                    },
                    minLength:{
                        value: 10,
                        message:'Enter 10 digits'
                    },
                    maxLength:{
                        value: 10,
                        message:'phone number exceeds 10 digits'
                    }
    
                })}
                placeholder="+91 Phone Number"
              />
               {
              isPhoneTakenError ?
              <p className="text-xs italic text-red-500">
              Phone number already exists
              </p>
              :
              null
             }
              <p className="text-xs italic text-red-500">
              {errors.phone?.message}
              </p>
            </div>
          </div>
          <div className="mb-4 md:flex md:justify-between">
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
                {...register('password',{
                    required: 'Password is required',
                    minLength:{
                        value: 4,
                        message:'Enter min 4 digits'
                    },
    
                })}
                placeholder="******************"
              />
              <p className="text-xs italic text-red-500">
              {errors.password?.message}
              </p>
              <input type="checkbox" onClick={toggleShowPassword}/> Show Password
            </div>
            <div className="md:ml-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="c_password"
              >
                Confirm Password
              </label>
              <input
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="c_password"
                type="password"
                {...register('confirmPassword',{
                    required: true,
                    validate: value => value === watch ('password') || "Passwords do not match"
    
                })}
                placeholder="******************"
              />
              <p className="text-xs italic text-red-500">
              {errors.confirmPassword?.message}
              </p>
            </div>
          </div>
          <div className="mb-6 text-center">
            <button
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register Account
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
            <Link
              className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
              to={'/school_admin/login'}
            >
              Already have an account?
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

export default SignupForm