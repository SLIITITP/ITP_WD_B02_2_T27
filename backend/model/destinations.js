const mongoose = require('mongoose');
const { stringify } = require('querystring');

const destinationSchema = new mongoose.Schema({
    topic:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },    
    image:{
        type:String,
        require:true
    },
});

module.exports = mongoose.model("Destinations",destinationSchema);