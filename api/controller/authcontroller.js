import User from "../models/usermodel.js";
import bcryptjs from 'bcryptjs'

export const signup = async (req, res)  =>{
    const { username ="vinthiya", password = "vinthiya", email="vinthiya@gmail.com"}
      = req.body;
    const hashedPassword = bcryptjs.hashSync(password , 10);
    const newUser = new User({username, password:hashedPassword, email});
   try {
    await newUser.save();
    res.status(201).json("user created successfully");
   } catch (error) {
    res.status(500).json(error.message);
   }
    

}

