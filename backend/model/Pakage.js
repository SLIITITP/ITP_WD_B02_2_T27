const mongoose = require('mongoose');

const pakageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    distance: {
        type: Number,
        require: true
    },
    specification: [String],
    description: {
        type: String,
        required: true,
        trim: true
    },
    pictures: [{
        public_id: String,
        url: String
    }],
    hotels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotels"
    }]

}, { timestamps: true });

const Pakage = mongoose.model("Pakages", pakageSchema);


module.exports = Pakage;