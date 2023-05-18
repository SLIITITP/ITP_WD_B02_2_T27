import express from "express";
import { getAllFUser, flogin, fsignup } from "../controllers/user-controller.js";

const router = express.Router();

router.get("/", getAllFUser);
router.post("/signup", fsignup);
router.post("/login", flogin);
export default router;