import mongoose from "mongoose";
import Reservation from "../model/Reservation.js";
import User from "../model/User.js";

export const getAllReservations = async (req, res, next) => {
  let reservations;
  try {
    reservations = await Reservation.find().populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!reservations) {
    return res.status(404).json({ message: "No Reservations Found" });
  }
  return res.status(200).json({ reservations });
};

export const addReservation = async (req, res, next) => {
  const { flightName, firstName, lastName, email, phone, country, date, fClass, noOfPassengers, user } = req.body;

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
    flightName, firstName, lastName, email, phone, country, date, fClass, noOfPassengers, user,
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

export const updateReservation = async (req, res, next) => {
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

export const getById = async (req, res, next) => {
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

export const deleteReservation = async (req, res, next) => {
  const id = req.params.id;

  let reservation;
  try {
    reservation = await Reservation.findByIdAndRemove(id).populate("user");
    await reservation.user.reservations.pull(reservation);
    await reservation.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!reservation) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};

export const getByUserId = async (req, res, next) => {
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