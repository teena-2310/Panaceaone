import Contact from "../models/Contact.js";
import { sendAdminNotification, sendAutoReply } from "../utils/sendEmail.js";

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

    /* ===============================
       SEND ADMIN NOTIFICATION
    =============================== */
    await sendAdminNotification({
      subject: "New Contact Message - Panacea One",
      replyTo: email,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    /* ===============================
       SEND AUTO REPLY TO USER
    =============================== */
    await sendAutoReply({
      type: "contact",
      name,
      email,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newContact,
    });
  } catch (error) {
    console.error("Contact error:", error); // 👈 IMPORTANT
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};