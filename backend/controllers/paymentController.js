const paymentModel = require("../models/paymentModel");

//payment callback
const paymentController = async (req, res) => {
  try {
    const newPayment = await paymentModel({ ...req.body, status: "pending" });
    await newPayment.save();
    res.status(201).json({
      success: true,
      newPayment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while paying",
    });
  }
};

//get all Payments
const getAllPayments = async (req, res) => {
  let payments;

  try {
    payments = await paymentModel.find();
  } catch (error) {
    console.log(error);
  }
  if (!payments) {
    return res.status(404).json({ message: "No payments found" });
  }
  return res.status(200).json({ payments });
};

//Update payment
const updatePayment = async (req, res) => {
  const { Hname, bank, card_number, cvv, status } = req.body;
  const paymentId = req.params.id;
  let payment;
  try {
    payment = await paymentModel.findByIdAndUpdate(paymentId, {
      Hname,
      bank,
      card_number,
      cvv,
      status,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!payment) {
    return res.status(500).json({ message: "Unable to update the Payment" });
  }
  return res.status(200).json({ payment });
};

//http://localhost:8070/user/update/:id
const editDetail = async (req, res) => {
  let paymentId = req.params.id;
  let payment;
  const {
    name,
    email,
    phone,
    address,
    country,
    country_code,
    Hname,
    bank,
    card_number,
    cvv,
    code,
    date,
  } = req.body;

  const updatepayment = {
    name,
    email,
    phone,
    address,
    country,
    country_code,
    Hname,
    bank,
    card_number,
    cvv,
    code,
    date,
  };

  const update = await paymentModel
    .findByIdAndUpdate(paymentId, updatepayment)
    .then(() => {
      res.status(200).send({ status: "Payment Details Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "error with updating data." });
    });
};

const getById = async (req, res) => {
  const id = req.params.id;
  let payment;
  try {
    payment = await paymentModel.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!payment) {
    return res.status(404).json({ message: "No Payment Found" });
  }
  return res.status(200).json({ payment });
};

//delete payments
const deletePayment = async (req, res) => {
  const id = req.params.id;

  let payment;
  try {
    payment = await paymentModel.findByIdAndRemove(id);
  } catch (error) {
    console.log(error);
  }
  if (!payment) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};

const searchPayment = async (req, res) => {
  let data = await paymentModel.find({
    $or: [{ name: { $regex: req.params.key } }],
  });
  console.log(req.params.key);
  res.send(data);
};

//Generate pdf
async function reportOfPayment(req, res) {
  try {
    //query the mongodb database for the data
    const data = await paymentModel.findById(id);

    //set the response headers to indicate that we are sending a pdf file
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename = payment_report.pdf"
    );

    //create a new instance of the PDFDocument class and pipe it to the response object
    const doc = new PDFDocument();
    doc.pipe(res);

    //display the topic
    doc.font("Helvetica-Bold");
    doc.fontSize(20).text("Serendib Travels", { align: "center" });
    doc.fontSize(16).text("Fianance Management\nReport of Payments\n\n", {
      align: "center",
    });

    //loop through the data and add it to the pdf document
    data.forEach((transection) => {
      doc.font("Helvetica");
      doc.fontSize(12);
      doc.text(`ID : ${transection._id}`);
      doc.text(`Name on Card : ${transection.Hname}`);
      doc.text(`Bank Name : ${transection.bank}`);
      doc.text(`Card No : ${transection.card_number}`);
      doc.text(`CVV : ${transection.cvv}`);
      doc.text(`Ex.Date : ${transection.date}`);
      doc.moveDown();
    });

    //finalize the pdf document and end the response
    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

module.exports = {
  paymentController,
  getAllPayments,
  updatePayment,
  getById,
  editDetail,
  deletePayment,
  searchPayment,
  reportOfPayment,
};
