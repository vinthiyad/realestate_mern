import {GoogleAuthProvider, getAuth, signInWithPopup} from   'firebase/auth'
import { app } from '../firebase.js'
import {useDispatch} from 'react-redux';
import {signinsuccess} from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

export const OAuth = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const handleGoogleLogin  = async () =>{
    try{
    const provider = new GoogleAuthProvider();
    const auth  = getAuth(app);
    const result =  await signInWithPopup(auth  , provider);
    console.log("result   ",result.user.displayName,"email -->" ,result.user.email)
    const res = await fetch("/api/auth/google" , {
     method:"POST",
     headers:{
      "Content-Type" : "application/json"
     },
     body: JSON.stringify({
      name:result.user.displayName  ,
      email: result.user.email,
      photo: result.user.photoURL,
     }),

   });
    const data = await res.json();
    console.log("data  -->" , data)
    
    dispatch(signinsuccess(data));
    navigate("/");
    }catch (error){
        console.log("Cannot able to Login with Google" , error);
   }
}


  return (
    <button type="button" onClick={handleGoogleLogin} className=' text-white bg-green-700 p-3 rounded-lg uppercase'>
        continue with google
    </button>
  )
}
