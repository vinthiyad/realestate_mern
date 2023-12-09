import User from "../models/usermodel.js";
import bcryptjs from 'bcryptjs'

export const signup = async (req, res , next)  =>{
    const { username, password , email} = req.body;
    const hashedPassword = bcryptjs.hashSync(password , 10);
    console.log("hashed password --",hashedPassword,"usrname ---" , username ,"emial--" , email)
    const newUser = new User({username, password:hashedPassword, email});
   try {
    await newUser.save();
    res.status(201).json("user created successfully");  
   } catch (error) {
    next(error);
   }
    

}

