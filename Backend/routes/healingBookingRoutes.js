import express from "express";
import HealingBooking from "../models/HealingBooking.js";
import multer from "multer";

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });
 

router.post("/create", async (req, res) => {
  try {
    const booking = await HealingBooking.create(req.body);
    res.status(201).json({
      success: true,
      bookingId: booking._id
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking" });
  }
});

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
      message: "Payment method updated"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/:id/upload-proof", upload.single("screenshot"), async (req, res) => {
  try {
    const booking = await HealingBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.transactionId = req.body.transactionId;
    booking.paymentScreenshot = req.file.path;
    booking.paymentStatus = "Pending";

    await booking.save();

    res.json({
      success: true,
      message: "Payment proof uploaded"
    });

  } catch (error) {
    res.status(500).json({ message: "Upload failed" });
  }
});

// Admin verify payment
router.put("/:id/verify", async (req, res) => {
  try {
    const booking = await HealingBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    booking.paymentStatus = "verified";
    booking.status = "confirmed";

    await booking.save();

    res.json({
      success: true,
      message: "Booking verified successfully",
      booking
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});





export default router;