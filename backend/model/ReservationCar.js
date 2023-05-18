import mongoose from "mongoose";

//create a schema for the reservation
const Schema = mongoose.Schema;

//creating the schema for the reservation
const reservationSchema = new Schema({
  carType: {
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
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },  
   endDate: {
    type: Date,
    required: true,
  },  
  licenseNumber: {
    type: String,
    required: true,
  }, 

  /*
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  */
  
});

export default mongoose.model("carReservationnew", reservationSchema);