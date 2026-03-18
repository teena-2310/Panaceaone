import express from "express";
import HealingBooking from "../models/HealingBooking.js";
import multer from "multer";
import { sendAdminNotification, sendAutoReply } from "../utils/sendEmail.js";

const router = express.Router();

/* =======================================
   MULTER (MEMORY STORAGE)
======================================= */
const upload = multer({
  storage: multer.memoryStorage(),
});

/* =======================================
   CREATE BOOKING
======================================= */
router.post("/create", async (req, res) => {
  try {
    const { name, email, phone, healingType, date, time, amount } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and phone are required",
      });
    }

    const booking = await HealingBooking.create({
      name,
      email,
      phone,
      healingType,
      date,
      time,
      amount,
      paymentStatus: "Pending",
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      bookingId: booking._id,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error creating booking",
    });
  }
});

/* =======================================
   UPDATE PAYMENT METHOD
======================================= */
router.put("/:id/payment-method", async (req, res) => {
  try {
    if (!req.body.paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Payment method required",
      });
    }

    const booking = await HealingBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.paymentMethod = req.body.paymentMethod;
    await booking.save();

    return res.json({
      success: true,
      message: "Payment method updated",
    });
  } catch (error) {
    console.error("PAYMENT METHOD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* =======================================
   UPLOAD PAYMENT PROOF
======================================= */
router.post(
  "/:id/upload-proof",
  upload.single("screenshot"),
  async (req, res) => {
    try {
      const booking = await HealingBooking.findById(req.params.id);

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      if (!req.body.transactionId || !req.file) {
        return res.status(400).json({
          success: false,
          message: "Transaction ID and screenshot required",
        });
      }

      // ✅ FILE TYPE CHECK
      if (!req.file.mimetype.startsWith("image/")) {
        return res.status(400).json({
          success: false,
          message: "Only image files allowed",
        });
      }

      booking.transactionId = req.body.transactionId;
      booking.paymentStatus = "Pending";
      await booking.save();

      res.json({
        success: true,
        message: "Payment proof submitted successfully",
      });

      // ✅ BACKGROUND EMAIL
      (async () => {
        try {
          await sendAdminNotification({
            subject: "New Healing Booking Payment - Panacea One",
            replyTo: booking.email,
            html: `
            <h3>New Healing Booking Payment</h3>

            <p><strong>Name:</strong> ${booking.name}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.phone}</p>

            <p><strong>Healing Type:</strong> ${booking.healingType}</p>
            <p><strong>Date:</strong> ${booking.date}</p>
            <p><strong>Time:</strong> ${booking.time}</p>

            <p><strong>Payment Method:</strong> ${booking.paymentMethod}</p>
            <p><strong>Transaction ID:</strong> ${booking.transactionId}</p>
          `,
            attachments: [
              {
                filename: req.file.originalname,
                content: req.file.buffer,
              },
            ],
          });

          await sendAutoReply({
            type: "healing",
            name: booking.name,
            email: booking.email,
            healingType: booking.healingType,
          });

          console.log("✅ Emails sent successfully");
        } catch (err) {
          console.error("❌ Email error:", err);
        }
      })();
    } catch (error) {
      console.error("UPLOAD ERROR:", error);

      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
);

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

    return res.json({
      success: true,
      message: "Booking verified successfully",
      booking,
    });
  } catch (error) {
    console.error("VERIFY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
