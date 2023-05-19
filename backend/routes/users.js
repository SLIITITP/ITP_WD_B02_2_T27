import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

/*
router.get("/checkAuthentication", verifyToken, (req, res, next) => {
    res.send("hello user, you are logged in");
})

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.send("hello user, you are logged in and you can delete your account");
})

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
    res.send("hello admin, you are logged in and you can delete all accounts");
}) 
*/

//UPDATE
router.put("/:id", verifyUser, updateUser); //definition is in the controllers/user.js

//DELETE
router.delete("/:id", verifyUser, deleteUser); //definition is in the controllers/user.js

//GET
router.get("/:id", verifyUser, getUser); //definition is in the controllers/user.js

//GET ALL
router.get("/", verifyAdmin, getUsers); //definition is in the controllers/user.js


export default router