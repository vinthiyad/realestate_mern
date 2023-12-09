import  express from "express";
import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.listen(3000, () =>{
    console.log("Server is runnng on  port 3000")
});

 mongoose
 .connect(process.env.MONGODB)
 .then( ()=>{
    console.log("Connected TO MONGODB");
 })
 .catch((err) => {
    console.log(err);
 });
 