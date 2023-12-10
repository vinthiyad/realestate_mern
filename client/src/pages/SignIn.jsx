import { useState } from 'react'
import {Link , useNavigate}  from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';

import {
  signinstart,
  signinsuccess,
  signinfailure} from '../redux/user/userSlice.js';
 
const SignIn = () => {
const navigate = useNavigate();
const dispatch = useDispatch();
const { loading , error} =useSelector((state) =>state.user)
const [formdata , setFormData ]  = useState({});


const handleChange = (e) =>{
  setFormData({
    ...formdata ,
    [e.target.id] : e.target.value,
  });
};

const handleSubmit = async (e) =>{
  e.preventDefault();
 
  try {
   dispatch(signinstart());
    const result = await fetch("/api/auth/signin" ,{ 
      method: "post",
      headers : {
          "Content-Type" : "application/json",
      },
      body: JSON.stringify(formdata), 
    }
    );
   
    const data = await result.json();
    console.log("data ---",data);
    if(data.success === false){
      dispatch(signinfailure(data.message))
      return;
    }
    dispatch(signinsuccess(data))
    navigate("/")
  } catch (error) {
    dispatch(signinfailure(error.message))
  }

}
  return (
    <div className= 'mx-auto max-w-lg p-3'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <div>
        { error &&  <p className='text-red-500 mt-5'> {error}</p>  }
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
      <input  onChange={handleChange} type="email" placeholder='email' id="email" className='p-3 border rounded-lg '/>
      <input  onChange={handleChange} type="password" placeholder='password' id="password" className='p-3 border rounded-lg '/>
      <button disabled = {loading} className='text-white bg-slate-600 disabled:opacity-50 hover:opacity-80 p-3 border rounded-lg uppercase'>
      {loading ? "Loading..."  : "Sign In"} 
      </button>
      </form> 
      <div className='mt-3'>
        <span className='pr-3'> Dont have an account ?</span>
        <Link to="/signup">
        <span className='text-blue-800 font-bold'>
         Sign Up
        </span>
        </Link>
      </div>

    
   
    </div>
  )
}

export default SignIn