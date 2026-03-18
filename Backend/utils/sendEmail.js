// utils/sendEmail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create transporter (reusable)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,               // 465 for SSL, 587 for TLS
  secure: true,            // true for 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,  // app password if Gmail
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Send Admin Notification
export const sendAdminNotification = async ({ subject, html, attachments = [], replyTo = null }) => {
  try {
    await transporter.sendMail({
      from: `"Panacea One Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,  // admin email
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

// Centralized Auto Reply
export const sendAutoReply = async ({ type, name, email, healingType, products = [] }) => {
  try {
    let subject = "";
    let message = "";

    if (type === "contact") {
      subject = "Thank you for contacting Panacea One";
      message = `
        <p>Dear ${name},</p>
        <p>Thank you for contacting us. We have received your message and will get back to you soon.</p>
        <p>Warm regards,<br/>Panacea One Team</p>
      `;
    }

    if (type === "healing") {
      subject = "Your Healing Session is Confirmed – Panacea One 🌿";
      message = `
        <h2>Your Healing Session is Confirmed – Panacea One 🌿</h2>
        <p>Dear ${name},</p>
        <p>Thank you for your booking! 🎉</p>
        <p>Your booking for <strong>Panacea One – ${healingType}</strong> session has been successfully confirmed.</p>
        <p>Our team will prepare your session and contact you shortly with the details.</p>
        <p><em>Heal from within, Glow from outside ✨</em></p>
        <p>Thank you for choosing Panacea One.</p>
        <p>Warm regards,<br><strong>Team Panacea One</strong></p>
      `;
    }

    if (type === "order") {
      subject = "Order Confirmation - Panacea One";
      message = `
        <p>Dear ${name},</p>
        <p>Thank you for your order. We have received your order request.</p>
        <p>Our team is currently processing your order and will ensure it is handled promptly. If we require any additional information, we will contact you directly.</p>
        <p>Best regards,<br/>The Panacea One Team</p>
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