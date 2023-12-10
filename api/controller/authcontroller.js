import User from "../models/usermodel.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const signup = async (req, res , next)  =>{
    const { username, password , email} = req.body;
    const hashedPassword = bcryptjs.hashSync(password , 10);
   
    const newUser = new User({username, password:hashedPassword, email});
   try {
    await newUser.save();
    res.status(201).json("user created successfully");  
   } catch (error) {
    next(error);
   }
    
   
}

export const signin = async ( req,res, next) =>{
   console.log("@ signn")
    const {email, password}  = req.body;
 try {
   const  validUser = await User.findOne({email});
   if(!validUser){
    return next(errorHandler(404,"User Nor Found"));
   }
   const validPassword =  bcryptjs.compareSync(password, validUser.password)
   if(!validPassword){
    return next(errorHandler(401, "Invalid Credentials"));
   }
   const token = jwt.sign({id:validUser} , process.env.JWT_SECRET_KEY);
   const  {password: pass , ...restdata}  =  validUser._doc;

   res
   .cookie("token" ,token, {httpOnly : true})
   .status(200)
   .json(restdata);
   
 } catch (error) {
    next(error);
 }
}

