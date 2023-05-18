const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSChema = new Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    location:{
        type: String,
        required: true,
    },
    feedback:{
        type: String,
        required: true
    }
  
})

//Create model
const feedback = new mongoose.model("feedback", feedbackSChema);

module.exports = feedback;