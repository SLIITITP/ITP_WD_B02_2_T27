import express from "express";
import {
  addFlight,
  deleteFlight,
  getAllFlights,
  getById,
  //getByUserId,
  updateFlight,
} from "../controllers/flight-controller.js";
const flightRouter = express.Router();

flightRouter.get("/", getAllFlights);
flightRouter.post("/add", addFlight);
flightRouter.put("/update/:id", updateFlight);
flightRouter.get("/:id", getById);
flightRouter.delete("/:id", deleteFlight);
//flightRouter.get("/user/:id", getByUserId);

export default flightRouter;