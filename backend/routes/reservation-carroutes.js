import express from "express";
import {
  addCarReservation,
  deleteCarReservation,
  updateCarReservation,
  getByCarUserId,
  getAllCarReservations,
  getByCarId,
} from "../controllers/reservation-carcontroller.js";
const  carReservationRouter = express.Router();

carReservationRouter.post("/add", addCarReservation);
carReservationRouter.get("/", getAllCarReservations);
carReservationRouter.put("/update/:id",  updateCarReservation);
carReservationRouter.delete("/:id", deleteCarReservation);
carReservationRouter.get("/all/:id", getByCarUserId);
carReservationRouter.get("/:id", getByCarId);

export default carReservationRouter;