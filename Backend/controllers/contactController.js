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

    const newContact = await Contact.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newContact,
    });

    (async () => {
      try {
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

        await sendAutoReply({
          type: "contact",
          name,
          email,
        });

        console.log("✅ Contact emails sent");
      } catch (err) {
        console.error("❌ Email error:", err);
      }
    })();
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
