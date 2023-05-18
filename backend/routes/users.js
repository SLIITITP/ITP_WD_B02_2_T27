const router = require("express").Router();
let user = require("../model/user");
const bcrypt = require('bcrypt');

//http://localhost:8070/user/add
router.route("/add").post((req, res) => {

    const username = req.body.username;
    const contact = req.body.contact;
    const location = req.body.location;
    const email = req.body.email;
    const password = req.body.password;

    const createUser = new user({
        username,
        contact,
        location,
        email,
        password,
    })

    createUser.save().then(() => {
        res.json("User registered")
    }).catch((err) => {
        console.log(err);
    })


})

// http://localhost/8070/user/login
router.route('/login').post(function (req, res) {
    let email = req.body.email;
    let password = req.body.password;

    user.findOne({ email }).select("+password").then((user) => {
        const isPasswordCorrect = bcrypt.compare(password, user.password);
        
        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials" });
        
        res.status(200).send({message: "Successful Login",results: user});
    }).catch((err) => {
        res.status(400).send({message: "User Not Found"});
    })
})



//http://localhost/8070/user/get/:id
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    const users = await user.findById(userId)
        .then((user) => {
            res.status(200).send({ status: "user fetched", user })
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "error with get user", error: err.message });
        })
})

//http://localhost:8070/user/update/:id
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { username, contact, location, password } = req.body;

    const updateUser = {
        username,
        contact,
        location,
        password
    }

    const update = await user.findByIdAndUpdate(userId, updateUser)
        .then(() => {
            res.status(200).send({ status: "User profile updated" })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "error with updating data." });
        })
})

//http://localhost:8070/user/delete/:id

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await user.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: "User deleted" })
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "error with delete user.", error: err.message });
    })
})


module.exports = router;