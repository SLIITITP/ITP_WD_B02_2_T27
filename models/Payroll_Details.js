const mongoose = require('mongoose');
const AddPayrollSchema = new mongoose.Schema({

    NIC:{
        type:String,
        required:true
    },

    Basic:{
        type:String,
        required:true
    },

    OT:{
        type:String,
        required:true
    },

    Allowances:{
        type:String,
        required:true
    },

    Deductions:{
        type:String,
        required:true
    },

    Net:{
        type:String,
        required:true
    }
    
});

module.exports = mongoose.model('AddPayroll',AddPayrollSchema);

