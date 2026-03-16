// utils/sendEmail.js
import nodemailer from "nodemailer";

// Create ONE transporter (reusable)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
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

// 1️⃣ Send Admin Notification
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

// 2️⃣ Centralized Auto Reply
export const sendAutoReply = async ({ type, name, email, healingType }) => {
  try {
    let subject = "";
    let message = "";
    let html = "";

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

      <p>
      Your booking for <strong>Panacea One – ${healingType}</strong> session
      has been successfully confirmed.
      </p>

      <p>
      Our team will prepare your session and contact you shortly with the details.
      </p>

      <p><em>Heal from within, Glow from outside ✨</em></p>

      <p>Thank you for choosing Panacea One.</p>

      <br>

      <p>Warm regards,<br>
      <strong>Team Panacea One</strong></p>

  
  `;
} 

    if (type === "order") {
      subject = "Order Confirmation - Panacea One";
      message = `
        <p>Dear ${name},</p>
        <p>Thank you for your order. We have received your request successfully.</p>
        <p>Our team will process it and contact you if needed.</p>
        <p>Warm regards,<br/>Panacea One Team</p>
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