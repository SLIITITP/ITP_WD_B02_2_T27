const mongoose = require("mongoose");

//Schema design
const paymentSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },

    email: {
      type: String,
      required: [true, "email is required and should be unique"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    country: {
      type: String,
      required: [true, "country is required"],
    },
    country_code: {
      type: String,
      required: [true, "country code is required"],
    },
    Hname: {
      type: String,
      required: [true, "holder name is required"],
    },
    bank: {
      type: String,
      required: [true, "bank name is required"],
    },
    card_number: {
      type: String,
      required: [true, "card number is required"],
    },
    cvv: {
      type: String,
      required: [true, "cvv code is required should be unique"],
      unique: true,
    },
    code: {
      type: String,
      required: [true, "zip/postal code is required"],
    },
    date: {
      type: String,
      required: [true, "date is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

//export
const paymentModel = mongoose.model("payments", paymentSchema);
module.exports = paymentModel;
