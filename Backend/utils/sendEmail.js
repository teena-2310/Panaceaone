// utils/sendEmail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 465, // ✅ FIX
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verify transporter (runs once)
transporter.verify((error) => {
  if (error) {
    console.error("❌ Email server error:", error);
  } else {
    console.log("✅ Email server is ready");
  }
});

// Send Admin Notification
export const sendAdminNotification = async ({
  subject,
  html,
  attachments = [],
  replyTo = null,
}) => {
  try {
    await transporter.sendMail({
      from: `"Panacea One Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo,
      subject,
      html,
      attachments,
    });
    console.log("Admin email sent");
  } catch (error) {
    console.error("Admin email error:", error);
  }
};

// Auto Reply
export const sendAutoReply = async ({ type, name, email, healingType }) => {
  try {
    let subject = "";
    let message = "";

    if (type === "contact") {
      subject = "Thank you for contacting Panacea One";
      message = `
        <p>Dear ${name},</p>
        <p>Thank you for contacting us. We will get back to you soon.</p>
        <p>Warm regards,<br/>Panacea One Team</p>
      `;
    }

    if (type === "healing") {
      subject = "Your Healing Session is Confirmed – Panacea One 🌿";
      message = `
        <h2>Your Healing Session is Confirmed – Panacea One 🌿</h2>
        <p>Dear ${name},</p>
        <p>Your session for <strong>${healingType}</strong> is confirmed.</p>
        <p>We will contact you shortly.</p>
        <p>Team Panacea One</p>
      `;
    }

    if (type === "order") {
      subject = "Order Confirmation - Panacea One";
      message = `
        <p>Dear ${name},</p>
        <p>Your order has been received and is being processed.</p>
        <p>Thank you!</p>
      `;
    }

    await transporter.sendMail({
      from: `"Panacea One Website" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html: message,
    });

    console.log("Auto reply sent");
  } catch (error) {
    console.error("Auto reply error:", error);
  }
};
