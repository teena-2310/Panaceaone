import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";

import contactRoutes from "./routes/contactRoutes.js";
import healingBookingRoutes from "./routes/healingBookingRoutes.js";
import { sendAdminNotification, sendAutoReply } from "./utils/sendEmail.js";

const app = express();

/* =============================
   MIDDLEWARE
============================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://panacea-one.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Optional logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

/* =============================
   ENV CHECK
============================= */
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI not found in .env");
  process.exit(1);
}

/* =============================
   MONGODB
============================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });

/* =============================
   MULTER
============================= */
const upload = multer({
  storage: multer.memoryStorage(),
});

/* =============================
   ROUTES
============================= */
app.use("/api/bookings", healingBookingRoutes);
app.use("/api/contact", contactRoutes);

/* =============================
   ORDER ROUTE
============================= */
app.post("/api/send-order", upload.single("screenshot"), async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      payment,
      transactionId,
      total,
      items,
    } = req.body;

    if (!name || !email || !phone || !address || !payment || !total || !items) {
      return res.status(400).json({
        success: false,
        message: "Missing fields",
      });
    }

    let parsedItems = [];
    try {
      parsedItems = JSON.parse(items);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid items format",
      });
    }

    const itemsHtml = parsedItems
      .map(
        (item) => `
        <tr>
          <td>${item.title}</td>
          <td>${item.quantity}</td>
          <td>₹${item.price}</td>
          <td>₹${item.price * item.quantity}</td>
        </tr>
      `,
      )
      .join("");

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
    });

    (async () => {
      try {
        await sendAdminNotification({
          subject: "New Order - Panacea One",
          replyTo: email,
          html: `
            <h3>New Order Received</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Payment:</strong> ${payment}</p>
            <p><strong>Transaction ID:</strong> ${transactionId || "N/A"}</p>

            <h4>Items</h4>
            <table border="1" cellpadding="8">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>${itemsHtml}</tbody>
            </table>

            <h3>Total: ₹${total}</h3>
          `,
          attachments: req.file
            ? [
                {
                  filename: req.file.originalname,
                  content: req.file.buffer,
                },
              ]
            : [],
        });

        if (email) {
          await sendAutoReply({
            type: "order",
            name,
            email,
          });
        }

        console.log("✅ Emails sent");
      } catch (err) {
        console.error("❌ Email error:", err);
      }
    })();
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* =============================
   HEALTH ROUTES
============================= */
app.get("/", (req, res) => {
  res.send("🚀 Panacea One Backend is Running");
});

app.get("/api", (req, res) => {
  res.send("✅ API working");
});

/* =============================
   SERVER
============================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
