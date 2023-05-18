const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    contact:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }
})

//this function run before saving data to database
userSchema.pre("save", async function(next){

    //hashing the password
    //checking if the password is already hashed
    if (!this.isModified("password")){
        next();
    }

    //hashing the with difficulty level 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

const Users = new mongoose.model("Users", userSchema);

module.exports = Users;