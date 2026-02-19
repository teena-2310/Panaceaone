import mongoose from "mongoose";

const healingBookingSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  healingType: String,
  date: String,
  time: String,
  amount: Number,

  paymentMethod: {
    type: String,
    enum: ["UPI", "BANK"],
    default: null
  },

  transactionId: String,
  paymentScreenshot: String,

  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Rejected","verified"],
    default: "Pending"
  }

}, { timestamps: true });

export default mongoose.model("HealingBooking", healingBookingSchema);
