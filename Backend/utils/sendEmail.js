import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP CONNECTION ERROR:", error);
  } else {
    console.log("SMTP Server is ready to send messages");
  }
});

console.log("EMAIL_USER inside mail file:", process.env.EMAIL_USER);
console.log("EMAIL_PASS inside mail file:", process.env.EMAIL_PASS);

/* ============================= */
/* HEALING BOOKING EMAILS */
/* ============================= */

export const sendAdminEmail = async (booking) => {
  await transporter.sendMail({
    from: `"Panacea One" <${process.env.EMAIL_USER}>`,
    to: "dhana@panacea-one.com",
    subject: "🆕 New Healing Booking Payment Submitted",
    html: `
      <h3>New Healing Booking</h3>
      <p><strong>Name:</strong> ${booking.fullName}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Phone:</strong> ${booking.phone}</p>
      <p><strong>Healing Type:</strong> ${booking.healingType}</p>
      <p><strong>Date:</strong> ${booking.date}</p>
      <p><strong>Time:</strong> ${booking.time}</p>
      <p><strong>Amount:</strong> ₹${booking.amount}</p>
      <p><strong>Payment Method:</strong> ${booking.paymentMethod}</p>
      <p><strong>Transaction ID:</strong> ${booking.transactionId}</p>
      <p><strong>Status:</strong> ${booking.paymentStatus}</p>
    `,
    attachments: booking.paymentScreenshot
      ? [{ path: booking.paymentScreenshot }]
      : [],
  });
};

export const sendUserConfirmationEmail = async (booking) => {
  await transporter.sendMail({
    from: `"Panacea One" <${process.env.EMAIL_USER}>`,
    to: booking.email,
    subject: "Healing Call Booking Received – Panacea One",
    html: `
      <h3>Hello ${booking.fullName},</h3>
      <p>Thank you for booking your Healing Call.</p>
      <p>We have received your payment details and will verify them shortly.</p>
      <p><strong>Session Details:</strong></p>
      <p>Healing Type: ${booking.healingType}</p>
      <p>Date: ${booking.date}</p>
      <p>Time: ${booking.time}</p>
      <p>Amount: ₹${booking.amount}</p>
      <br/>
      <p>We will reach out to you soon.</p>
      <p>Warm regards,<br/>Panacea One</p>
    `,
  });
};

/* ============================= */
/* NEW: PRODUCT ORDER EMAIL */
/* ============================= */

export const sendOrderEmail = async (order) => {
  await transporter.sendMail({
    from: `"Panacea One" <${process.env.EMAIL_USER}>`,
    to: "dhana@panacea-one.com",
    subject: "🛒 New Product Order Received",
    html: `
      <h3>New Product Order</h3>
      <p><strong>Name:</strong> ${order.name}</p>
      <p><strong>Phone:</strong> ${order.phone}</p>
      <p><strong>Address:</strong> ${order.address}</p>
      <p><strong>Payment Method:</strong> ${order.payment}</p>
      <p><strong>Transaction ID:</strong> ${order.transactionId || "N/A"}</p>
      <hr/>
      <h4>Items Ordered:</h4>
      <ul>
        ${order.items
          .map(
            (item) =>
              `<li>${item.title} × ${item.quantity} = ₹${
                item.price * item.quantity
              }</li>`
          )
          .join("")}
      </ul>
      <hr/>
      <h3>Total: ₹${order.total}</h3>
    `,
    attachments: order.screenshot
      ? [
          {
            filename: order.screenshot.originalname,
            content: order.screenshot.buffer,
          },
        ]
      : [],
  });
};
