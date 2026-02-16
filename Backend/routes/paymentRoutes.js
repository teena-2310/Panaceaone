import express from "express";
import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Booking from "../models/Booking.js";


const router = express.Router();

router.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: "panacea_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/verify", async (req, res) => {
  const { order_id, payment_id, signature, bookingId } = req.body;

  const body = order_id + "|" + payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== signature) {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }

  await Booking.findByIdAndUpdate(bookingId, {
    status: "paid",
  });

  res.json({ success: true, message: "Payment verified & booking updated" });
});


export default router;
