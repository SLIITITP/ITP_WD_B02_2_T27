import express from "express";
import {
  addCarReservation,
  deleteCarReservation,
  updateCarReservation,
  getByCarUserId,
  getAllCarReservations,
  getByCarId,
} from "../controllers/reservation-carcontroller.js";
const  reservationRouter = express.Router();

reservationRouter.post("/add", addCarReservation);
reservationRouter.get("/", getAllCarReservations);
reservationRouter.put("/update/:id",  updateCarReservation);
reservationRouter.delete("/:id", deleteCarReservation);
reservationRouter.get("/all/:id", getByCarUserId);
reservationRouter.get("/:id", getByCarId);

export default reservationRouter;