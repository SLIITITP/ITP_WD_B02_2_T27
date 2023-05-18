import express from "express";
import { getAllUser, login, signup } from "../controllers/user-carcontroller.js";

const carRouter = express.Router();

carRouter.get("/", getAllUser);
carRouter.post("/signup", signup);
carRouter.post("/login", login);
export default carRouter;