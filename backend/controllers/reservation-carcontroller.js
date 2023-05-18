import mongoose from "mongoose";
import Reservation from "../model/ReservationCar.js";
import User from "../model/User.js";

//get all reservations from the database
export const getAllCarReservations = async (req, res) => {
  let reservations;
  try {
    reservations = await Reservation.find().populate("User");
  } catch (err) {
    return console.log(err);
  }
  if (!reservations) {
    
    return res.status(404).json({ message: "No Reservations Found" });
  }
  return res.status(200).json({ reservations });
};

//Add a reservation to the database
export const addCarReservation = async (req, res) => {
  const { carType, firstName, lastName, email, phone, country, noOfPassengers,startDate,endDate,licenseNumber, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable To Find User By This ID" });
  }
  const reservation = new Reservation({
    carType, firstName, lastName, email, phone, country, noOfPassengers,startDate,endDate,licenseNumber, user
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await reservation.save({ session });
    existingUser.reservations.push(reservation);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }

  return res.status(200).json({ reservation });
};

//update a reservation in the database
export const updateCarReservation = async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;
  const reservationId = req.params.id;
  let reservation;
  try {
    reservation = await Reservation.findByIdAndUpdate(reservationId, {
      firstName, lastName, email, phone,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!reservation) {
    return res.status(500).json({ message: "Unable To Update The Reservation" });
  }
  return res.status(200).json({ reservation });
};

//get a reservation by id and return it from the database
export const getByCarId = async (req, res, next) => {
  const id = req.params.id;
  let reservation;
  try {
    reservation = await Reservation.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!reservation) {
    return res.status(404).json({ message: "No Reservation Found" });
  }
  return res.status(200).json({ reservation });
};

//delete a reservation from the database
export const deleteCarReservation = async (req, res) => {
  const id = req.params.id;

  let reservation;
  try {
    reservation = await Reservation.findByIdAndRemove(id).populate("user");
    if (!reservation) {
      return res.status(500).json({ message: "Unable To Delete" });
    }

    // Check if the reservation has a user
    if (reservation.user) {
      await reservation.user.reservations.pull(reservation);
      await reservation.user.save();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable To Delete" });
  }

  return res.status(200).json({ message: "Successfully Deleted" });
};


//get all reservations of a user
export const getByCarUserId = async (req, res) => {
  const userId = req.params.id;
  let userReservations;
  try {
    const user = await User.findById(userId).populate("reservations");
    userReservations = user.reservations;
  } catch (err) {
    return console.log(err);
  }
  if (!userReservations) {
    return res.status(404).json({ message: "No Reservation Found" });
  }
  return res.status(200).json({ user: userReservations });
};