import express from "express";

import{ createHotel,
     uploadHotelPictures,
      updateHotel,
       deleteHotel, 
       getHotelDetails, 
       getPakageHotels } from'../controllers/hotelController.js';

const imageUpload = require('../middlewares/imageUpload');

const hotelroute = express.Router();

router.route('/pakage/:id/hotel/new').post(createHotel);
router.route('/hotel/:id/images').put(imageUpload('pictures'), uploadHotelPictures);
router.route('/pakage/:id/hotels').get(getPakageHotels);
router.route('/hotel/:id').put(updateHotel).delete(deleteHotel).get(getHotelDetails);



export default hotelroute;