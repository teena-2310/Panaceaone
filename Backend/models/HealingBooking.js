import mongoose from "mongoose";

const healingBookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  healingType: String,
  date: String,
  time: String,
  amount: Number,

  paymentMethod: {
    type: String,
    enum: ["UPI", "Bank"],
    default: null
  },

  transactionId: String,
  paymentScreenshot: String,

   paymentStatus: {
  type: String,
  enum: ["Pending", "Paid", "Rejected", "Verified"],
  default: "Pending"
},

status: {
  type: String,
  enum: ["Pending", "Confirmed", "Completed"],
  default: "Pending"
}

}, { timestamps: true });

export default mongoose.model("HealingBooking", healingBookingSchema);
