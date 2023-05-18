import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  flightName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  fClass: {
    type: String,
    required: true,
  },
  noOfPassengers: {
    type: Number,
    required: true,
  },
  
  user: {
    type: mongoose.Types.ObjectId,
    ref: "fUser",
    required: true,
  },
  
});

export default mongoose.model("Reservation", reservationSchema);