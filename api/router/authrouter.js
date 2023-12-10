import express from "express";
import {google, signin, signup} from "../controller/authcontroller.js";

const  router = express.Router();
console.log("2 router")
router.post("/signup" , signup);
router.post("/signin" , signin);
router.post("/google" , google);

export default router;