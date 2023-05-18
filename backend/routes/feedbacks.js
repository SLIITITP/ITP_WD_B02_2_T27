const router = require("express").Router();
const feedback = require("../model/feedback");
let feedbacks = require("../model/feedback");



//http://localhost:8070/feedback/add
router.route("/add").post((req,res)=>{
    const location = req.body.location;
    const feedback = req.body.feedback;
    const userID = req.body.id;


    const createFeedbck = new feedbacks({
        location,
        feedback,
        userID
    })

    createFeedbck.save().then(()=>{
        res.json("Feedback added")
    }).catch((err)=>{
        console.log(err);
    })


})


//http://localhost/8070/feedback
router.route("/").get((req,res)=>{

    feedbacks.find().populate({path:'userID',select:['username']}).then((feedbacks)=>{
        res.json(feedbacks)
    })

})

//http://localhost/8070/feedback/get/:id
router.route("/get/:id").get(async(req,res)=>{ 
    let feedbackId = req.params.id;
    const feedback1 = await feedbacks.findById(feedbackId).populate({path:'userID',select:['username']})
    .then((feedback)=>{
        res.status(200).send({status:"feedback fetched", feedback})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"error with get feedback",error: err.message});
    })

})

//http://localhost/8070/feedback/get/
router.route("/getall/:id").get(async(req,res)=>{ 
    let userID = req.params.id;
    
    await feedbacks.find({userID}).populate({path:'userID',select:['username']})
    .then((feedback)=>{
        res.status(200).send({status:"feedback fetched", feedback})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"error with get feedback",error: err.message});
    })

})





module.exports = router;