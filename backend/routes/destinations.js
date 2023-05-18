const express = require('express');
const Destinations = require('../model/destinations');
var multer = require('multer')
var uniqid = require('uniqid')


const router = express.Router();

//save destination
router.post('/destination/save',(req,res) => {
    let newDestination = new Destinations(req.body);

    newDestination.save((err) => {
        if(err) {
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Destination saved successful"
        });
    });

});


// get Destination
router.get('/destinations',(req,res) =>{
    Destinations.find().exec((err,destinations) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingDestinations:destinations
        });
    });
});



//get a specific Destination
router.get("/destination/:id",(req,res)=>{
    let destinationId = req.params.id;
    Destinations.findById(destinationId,(err,destination)=>{
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            destination
        });
    });
});



//update Destinations
router.put('/destination/update/:id',(req,res)=>{
    Destinations.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body
            },
            (err,destination)=>{
                if(err){
                    return res.status(400).json({
                        error:err
                    });
                }
                return res.status(200).json({
                    success:"updated successfully"
                });
            }
    );
});


//delete destination
router.delete('/destination/delete/:id',(req,res) =>{
    Destinations.findByIdAndRemove(req.params.id).exec((err,deletedDestination) =>{
        if(err) return res.status(400).json({
                message:"delete unsuccesful",err
        });
        return res.json({
            success:"delete successfully",deletedDestination
        });
    });
});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, uniqid() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')

//upload image destination
router.post('/destination/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

})



module.exports = router;