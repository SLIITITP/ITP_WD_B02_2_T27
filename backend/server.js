const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


//import routes
const destinationRoutes = require('./routes/destinations');

//app middleware
app.use(bodyParser.json());
app.use(cors());


app.use(destinationRoutes);


const port = 8000;

const DB_URL= 'mongodb+srv://Dilmi16:Dilmi16@cluster1.kv1naiq.mongodb.net/Destination?retryWrites=true&w=majority';


mongoose.connect(DB_URL)
.then(()=>{
    console.log('DB Connected');
})
.catch((err)=> console.log('DB Connection error',err));

app.listen(port, () =>{
    console.log(`App is running on ${port}`);
});


app.use(express.static('images'))