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
   const token = jwt.sign({id:validUser._id} , process.env.JWT_SECRET_KEY);
   const  {password: pass , ...restdata}  =  validUser._doc;

   res
   .cookie("token" ,token, {httpOnly : true})
   .status(200)
   .json(restdata);
   
 } catch (error) {
    next(error);
 }
}


export const google = async(req,res, next) =>{
 try{
    const validUser = await User.findOne({email : req.body.email});
    if(validUser){
      console.log("if f ")
      const token = jwt.sign({id:validUser._id} , process.env.JWT_SECRET_KEY);
      const  {password: pass , ...restdata}  =  validUser._doc;
      console.log("ifff  dat ",restdata)
      res
      .cookie("token" ,token, {httpOnly : true})
      .status(200)
      .json(restdata);
    }else{
      console.log("else ")
      const generatePassword = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword , 10);
      console.log("else req.body.name--->",req.body.name,"req.body.email ",req.body.email,"hashedPassword  ",hashedPassword)
      const newUser = new User({
      username:  
              req.body.name.split(' ').join('').toLowerCase()+
              Math.random().toString(36).slice(-8) ,
      email : req.body.email,
      password : hashedPassword,
      avatar : req.body.photo, 
   });
     await newUser.save();
     const token = jwt.sign({id:newUser._id} , process.env.JWT_SECRET_KEY);
     const  {password: pass , ...restdata}  =  newUser._doc;
     console.log("else dat ",restdata)
     res
     .cookie("token" ,token, {httpOnly : true})
     .status(200)
     .json(restdata);  
    }
 }catch(error){
  next(error);
 }
}
