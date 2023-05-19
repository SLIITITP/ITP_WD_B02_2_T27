import express from "express";
import Hotel from "../models/Hotel.js";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel); //definition is in the controllers/hotel.js

//UPDATE
router.put("/:id", verifyAdmin, updateHotel); //definition is in the controllers/hotel.js

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel); //definition is in the controllers/hotel.js

//GET
router.get("/find/:id", getHotel); //definition is in the controllers/hotel.js

//GET ALL
router.get("/", getHotels); //definition is in the controllers/hotel.js

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);


export default router