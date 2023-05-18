import express from "express";
import mongoose from "mongoose";
import carReservationRouter from "./routes/reservation-carroutes.js";
import carRouter from "./routes/user-carroutes.js";
import reservationRouter from "./routes/reservation-routes.js";
import router from "./routes/user-routes.js";
import cors from 'cors';
import cookieParser from 'cookie-parser'
// import package  route 
import pakagerouter from '../backend/routes/pakageRoute.js'
//import hotel route
import hotelroute from './routes/hotelRoute.js'

const app = express();
app.use (cors());
app.use(express.json());

//package route
app.use('api/package',pakagerouter)
app.use('api/hotel',hotelroute)

//car reservation routes
app.use("/api/user",carRouter);
app.use("/api/reservation",carReservationRouter);

//flight reservation routes
app.use("/api/user",router);
app.use("/api/reservation",reservationRouter);

mongoose.set('strictQuery', false);
mongoose.set('strictPopulate', false);
mongoose 
  .connect(
    "mongodb+srv://Dilmi16:Dilmi16@cluster1.kv1naiq.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() =>
    console.log("Connected TO Database and Listening TO Localhost 5000")
  )
  .catch((err) => console.log(err));