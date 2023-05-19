import User from "../models/User.js"

/* WE DON'T NEED TO CREATE A NEW USER FOR THIS SINCE WE'RE REGISTERING 
USERS THROUGH controller/auth.js */

//UPDATE
export const updateUser = async(req, res, next)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser)
    } catch (err) {
        next(err)
    }
}

//DELETE
export const deleteUser = async(req, res, next)=>{
    try {
        await User.findByIdAndDelete(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json("User has been deleted")
    } catch (err) {
        next(err)
    }
}

//GET A User
export const getUser = async(req, res, next)=>{
    try {
        const user = await User.findById(
            req.params.id,
        );
        res.status(200).json(user);
    } catch (err) {
        next(err) 
    }
}

//GET ALL UserS
export const getUsers = async(req, res, next)=>{
    try {
        const users = await User.find()
        res.status(200).json(users);
    } catch (err) {
        next(err)
    }
}