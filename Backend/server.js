import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import mongoose from "mongoose";
import contactRoutes from "./routes/contactRoutes.js";
import healingBookingRoutes from "./routes/healingBookingRoutes.js";
import cors from "cors";
import multer from "multer";
import { sendOrderEmail } from "./utils/sendEmail.js";

const app = express();

app.use(express.json());
app.use(cors());

// =============================
// MongoDB
// =============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });

// =============================
// MULTER SETUP (memory storage)
// =============================
const storage = multer.memoryStorage();
const upload = multer({ storage });

// =============================
// Routes
// =============================
app.use("/uploads", express.static("uploads"));
app.use("/api/bookings", healingBookingRoutes);
app.use("/api/contact", contactRoutes);

// =============================
// FIXED CHECKOUT ORDER ROUTE
// =============================
app.post("/api/send-order", upload.single("screenshot"), async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      payment,
      transactionId,
      total,
      items,
    } = req.body;

    if (!name || !phone || !address || !payment || !total || !items) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const parsedItems = JSON.parse(items);

    await sendOrderEmail({
      name,
      phone,
      address,
      payment,
      transactionId,
      total,
      items: parsedItems,
      screenshot: req.file,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Order Email Error:", error);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});