 import {Link}  from 'react-router-dom'
 
const SignUp = () => {
  return (
    <div className= 'mx-auto max-w-lg'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-6'>
        <input type="email" placeholder='email' id="email" className='p-3 border rounded-lg '/>
        <input type="password" placeholder='password' id="password" className='p-3 border rounded-lg '/>
        <button  className='text-white bg-slate-600 disabled:opacity-50 hover:opacity-80 p-3 border rounded-lg uppercase'>sign up</button>
      </form> 
      <div className='mt-3'>
        <span className='pr-3'> Have an account ?</span>
        <Link to="/signin">
        <span className='text-blue-800 font-bold'>Sign in</span>
        </Link>
      </div>
   
    </div>
  )
}

export default SignUp