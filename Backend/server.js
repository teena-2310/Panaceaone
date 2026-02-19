import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";
import healingBookingRoutes from "./routes/healingBookingRoutes.js";
import cors from "cors";
//import paymentRoutes from "./routes/paymentRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });

// ROUTES (BEFORE listen)
app.use("/uploads", express.static("uploads"));
app.use("/api/bookings", healingBookingRoutes);
app.use("/api/contact", contactRoutes);
//app.use("/api/payment", paymentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
