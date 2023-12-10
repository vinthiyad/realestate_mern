 import { useState } from 'react'
import {Link , useNavigate}  from 'react-router-dom'
 
const SignUp = () => {
  const navigate = useNavigate();
const [formdata , setFormData ]  = useState({});
const [loading , setLoading] = useState(false);
const[error , setError] = useState(null);

const handleChange = (e) =>{
  setFormData({
    ...formdata ,
    [e.target.id] : e.target.value,
  });
};

const handleSubmit = async (e) =>{
  e.preventDefault();
 
  try {
    setLoading(true);
    const result = await fetch("/api/auth/signup" ,{ 
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
      setLoading(false);
      setError(data.message);
      return;
    }
    setLoading(false);
    setError(null);
    navigate("/signin")

  } catch (error) {
    setLoading(false);
    setError(error.message);
  }

}
  return (
    <div className= 'mx-auto max-w-lg p-3'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <div>
        { error &&  <p className='text-red-500 mt-5'> {error}</p>  }
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
      <input  onChange={handleChange} type="username" placeholder='username' id="username" className='p-3 border rounded-lg '/>
      <input  onChange={handleChange} type="email" placeholder='email' id="email" className='p-3 border rounded-lg '/>
      <input  onChange={handleChange} type="password" placeholder='password' id="password" className='p-3 border rounded-lg '/>
      <button disabled = {loading} className='text-white bg-slate-600 disabled:opacity-50 hover:opacity-80 p-3 border rounded-lg uppercase'>
         {loading ? "Loading..."  : "Sign Up"}
      </button>
      </form> 
      <div className='mt-3'>
        <span className='pr-3'> Have an account ?</span>
        <Link to="/signin">
        <span className='text-blue-800 font-bold'>
          Sign In
        </span>
        </Link>
      </div>

    
   
    </div>
  )
}

export default SignUp