import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  bookTitle: { type: String, required: true },
  bookedDate: { type: Date, default: Date.now },
  returnDate: { type: Date }
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
