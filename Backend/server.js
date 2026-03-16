import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import contactRoutes from "./routes/contactRoutes.js";
import healingBookingRoutes from "./routes/healingBookingRoutes.js";
import cors from "cors";
import multer from "multer";
import { sendAdminNotification, sendAutoReply } from "./utils/sendEmail.js";

const app = express();

app.use(express.json());
app.use(cors());

/* =============================
   MongoDB
============================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });

  console.log("EMAIL HOST:", process.env.EMAIL_HOST);
/* =============================
   MULTER (Memory Storage)
============================= */
const upload = multer({
  storage: multer.memoryStorage(),
});

/* =============================
   Routes
============================= */
app.use("/api/bookings", healingBookingRoutes);
app.use("/api/contact", contactRoutes);

/* =============================
   CHECKOUT ORDER ROUTE
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

    const parsedItems = JSON.parse(items);

    const itemsHtml = parsedItems
  .map(
    (item) => `
      <tr>
        <td>${item.title}</td>
        <td>${item.quantity}</td>
        <td>₹${item.price}</td>
        <td>₹${item.price * item.quantity}</td>
      </tr>
    `
  )
  .join("");  
    /* ===============================
       SEND ADMIN NOTIFICATION
    =============================== */
    await sendAdminNotification({
      subject: "New Order - Panacea One",
      replyTo: req.body.email,
      html: `
        <h3>New Order Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Payment Method:</strong> ${payment}</p>
        <p><strong>Transaction ID:</strong> ${transactionId || "N/A"}</p>
         <h4>Ordered Items</h4>

    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>

      <tbody>
        ${itemsHtml}
      </tbody>
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

    /* ===============================
       SEND AUTO REPLY TO USER
    =============================== */
    if (req.body.email) {
      await sendAutoReply({
        type: "order",
        name,
        email: req.body.email,
      });
    }

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