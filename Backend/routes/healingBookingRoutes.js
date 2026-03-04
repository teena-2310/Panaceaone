import express from "express";
import HealingBooking from "../models/HealingBooking.js";
import multer from "multer";
import { sendAdminEmail, sendUserConfirmationEmail } from "../utils/sendEmail.js";

const router = express.Router();

/* =======================================
   USE MEMORY STORAGE (NO FILE SAVING)
======================================= */
const upload = multer({
  storage: multer.memoryStorage(),
});

/* =======================================
   CREATE BOOKING
======================================= */
router.post("/create", async (req, res) => {
  try {
    const booking = await HealingBooking.create(req.body);

    res.status(201).json({
      success: true,
      bookingId: booking._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking" });
  }
});

/* =======================================
   UPDATE PAYMENT METHOD
======================================= */
router.put("/:id/payment-method", async (req, res) => {
  try {
    const booking = await HealingBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.paymentMethod = req.body.paymentMethod;
    await booking.save();

    res.json({
      success: true,
      message: "Payment method updated",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =======================================
   UPLOAD PAYMENT PROOF (EMAIL ONLY)
======================================= */
router.post("/:id/upload-proof", upload.single("screenshot"), async (req, res) => {
  try {
    const booking = await HealingBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (!req.body.transactionId || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Transaction ID and screenshot required",
      });
    }

    // ✅ Update only required fields
    booking.transactionId = req.body.transactionId;
    booking.paymentStatus = "Pending";
    await booking.save();

    // ✅ Send emails with screenshot buffer (NOT saved anywhere)
    try {
      await sendAdminEmail({
        ...booking.toObject(),
        paymentScreenshot: req.file, // buffer
      });

      await sendUserConfirmationEmail(booking);
    } catch (emailError) {
      console.error("EMAIL ERROR:", emailError);
    }

    res.json({
      success: true,
      message: "Payment proof submitted successfully",
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

/* =======================================
   ADMIN VERIFY PAYMENT
======================================= */
router.put("/:id/verify", async (req, res) => {
  try {
    const booking = await HealingBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.paymentStatus = "Verified";
    booking.status = "Confirmed";

    await booking.save();

    res.json({
      success: true,
      message: "Booking verified successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;