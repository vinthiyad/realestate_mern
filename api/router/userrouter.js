import express from "express";
import usercontroller from "../controller/usercontroller.js";

const router = express.Router();

router.get("/hello" , usercontroller);

export default router;