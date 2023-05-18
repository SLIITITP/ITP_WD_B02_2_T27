const express = require("express");
const {
  paymentController,
  getAllPayments,
  updatePayment,
  deletePayment,
  getById,
  searchPayment,
  reportOfPayment,
  editDetail,
} = require("../controllers/paymentController");

//router object
const router = express.Router();

//routers
//POST ||  payment
router.post("/payment", paymentController);

//get all payemnts
router.get("/get-payment", getAllPayments);

//update payments
router.put("/update/:id", updatePayment);

//get payment by id
router.get("/:id", getById);

//delete payemnt
router.delete("/:id", deletePayment);

//report of payment
router.get("/print", reportOfPayment);

router.put("/edit/:id", editDetail);

router.get("/search/:key", searchPayment);

module.exports = router;
