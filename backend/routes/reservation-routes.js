import express from "express";
import {
  addReservation,
  deleteReservation,
  updateReservation,
  getByUserId,
  getAllReservations,
  getById,
} from "../controllers/reservation-controller.js";
const  reservationRouter = express.Router();

reservationRouter.post("/addf", addReservation);
reservationRouter.get("/f", getAllReservations);
reservationRouter.put("/updatef/:id",  updateReservation);
reservationRouter.delete("/:id", deleteReservation);
reservationRouter.get("/all/:id", getByUserId);
reservationRouter.get("/:id", getById);

export default reservationRouter;