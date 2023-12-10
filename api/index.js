import  express from "express";
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import userRouter from "./router/userrouter.js";
import authRouter  from "./router/authrouter.js"

dotenv.config();
mongoose
.connect(process.env.MONGODB)
.then( ()=>{
   console.log("Connected TO MONGODB");
})
.catch((err) => {
   console.log(err);
});


const app = express();
app.use(express.json());

app.listen(3000, () =>{
    console.log("Server is runnng on  port 3000")  
});

app.use("/api/user" , userRouter);
app.use("/api/auth" , authRouter);   

app.use((err, req, res, next) => {  
const statuscode  =  err.statuscode || 500 ;
const message = err.message || " Internal Server Error";
return res.status(statuscode).json({
   success : false,
   statuscode,
   message,
});

});