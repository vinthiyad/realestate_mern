import express from "express";
import {signin, signup} from "../controller/authcontroller.js";

const  router = express.Router();
console.log("2 router")
router.post("/signup" , signup);
router.post("/signin" , signin);

export default router;