const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    space: {
        type: Number,
        require: true
    },
    type: {
        type: String,
        enum: ['Single', 'Double'],
        required: true
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    specification: [String],
    notAvailable: [{
        type: Date,
    }],
    pictures: [{
        public_id: String,
        url: String
    }],
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotels",
        required: true
    }

}, { timestamps: true });

const Hotel = mongoose.model("Hotels", hotelSchema);

module.exports = Hotel;