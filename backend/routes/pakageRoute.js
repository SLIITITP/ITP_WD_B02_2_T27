import express from "express";

import {
     createPakage,
     uploadPakagePictures, 
     updatePakage,
      deletePakage, 
      getPakageDetails,
       getAllPakages }
 from'../controllers/pakageController';

const imageUpload = require('../middlewares/imageUpload');

const  pakagerouter = express.Router();

router.route('/pakage/new').post(createPakage);
router.route('/pakage/:id/images').put(imageUpload('pictures'), uploadPakagePictures);
router.route('/pakages').get(getAllPakages);
router.route('/pakage/:id').put(updatePakage).delete( deletePakage).get(getPakageDetails);

export default pakagerouter;