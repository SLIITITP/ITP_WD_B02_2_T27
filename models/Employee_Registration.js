const mongoose = require('mongoose');
const Employee_RegistrationSchema = new mongoose.Schema({

    Name:{
        type:String,
        required:true
    },

    NIC:{
        type:String,
        required:true
    },

    Address:{
        type:String,
        required:true
    },

    MobileNumber:{
        type:String,
        required:true
    },

    Email:{
        type:String,
        required:true
    },

    Description:{
        type:String,
        required:true
    },

    Remark:{
        type:String,
        required:true
    }
    
});

module.exports = mongoose.model('Employee_Registration',Employee_RegistrationSchema);

