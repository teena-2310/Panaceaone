import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Save to DB
    const newContact = await Contact.create({
      name,
      email,
      message,
    });

    // Email Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true, // true because 465 uses SSL
      auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
     },
    });

    // Email Content
     const mailOptions = {
        from: `"Panacea One Website" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email, // user email goes here
        subject: "New Contact Message - Panacea One",
        html: `
          <h3>New Contact Message</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
         `,
      };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newContact,
    });
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};