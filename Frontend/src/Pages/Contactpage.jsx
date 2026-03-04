import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Contactpage.css";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaRunning,
  FaEnvelope,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

export default function Contactpage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: "",
  });

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
 };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setFormData({ name: "", email: "", message: "" });
    } else {
      alert("Something went wrong");
    }
   } catch (error) {
    console.error("Error:", error);
    alert("Server error");
 }
 };

  return (
    <>


      <div className="contact-page">
        {/* HEADER */}
        <div className="contact-header">
          <h1>Connect with us for guidance and care.</h1>
          <p>We are Panacea One here to support your wellness journey. Reach out anytime!</p>
        </div>

        {/* MAIN SECTION */}
        <div className="contact-main">
          {/* LEFT INFO */}
          <div className="contact-left">
            <h2>Why Contact Panacea One?</h2>
            <ul className="contact-points">
              <li><FaCheckCircle /> Personalized wellness guidance</li>
              <li><FaCheckCircle /> Trusted natural healing support</li>
              <li><FaCheckCircle /> Fast response & friendly care</li>
              <li><FaCheckCircle /> Holistic mind & body solutions</li>
            </ul>

            <div className="working-hours">
              <h3><FaClock /> Working Hours</h3>
              <p>Monday – Saturday: 9:00 AM – 6:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="contact-box">
            <h2>Message Us</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                   type="text"
                   name="name"
                   placeholder="Full Name"
                   value={formData.name}
                   onChange={handleChange}
                   required
                />
              </div>
              <div className="form-row">
                 <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
              </div>
              <div className="form-row">
                <input type="tel" placeholder="Phone Number" required />
              </div>
              <div className="form-row">
                 <textarea
                     rows="4"
                     name="message"
                     placeholder="Your Message"
                     value={formData.message}
                     onChange={handleChange}
                     required
                  />
              </div>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>

        {/* INFO CARDS */}
        <div className="contact-info-section">
          <div className="info-card">
            <div className="icon-circle"><FaRunning /></div>
            <h3>ABOUT PANACEA</h3>
            <p>Healing Guidance<br />Wellness Support</p>
          </div>
          <div className="info-card">
            <div className="icon-circle"><FaPhoneAlt /></div>
            <h3>PHONE</h3>
            <p>+91 94981 03668</p>
          </div>
          <div className="info-card">
            <div className="icon-circle"><FaEnvelope /></div>
            <h3>EMAIL</h3>
            <p><a href="mailto:dhana@panacea-one.com">dhana@panacea-one.com</a></p>
          </div>
          <div className="info-card">
            <div className="icon-circle"><FaMapMarkerAlt /></div>
            <h3>OUR LOCATION</h3>
            <p>62, M3 Black Police Quarters,<br />S.M. Nagar, Avadi,<br />Chennai – 600062</p>
          </div>
        </div>

        {/* MAP */}
        <div className="map-section">
          <iframe
            title="Panacea Location"
            src="https://www.google.com/maps?q=Avadi,Chennai&output=embed"
            loading="lazy"
          ></iframe>
        </div>

        {/* WHATSAPP FLOAT */}
        <a
          href="https://wa.me/919498103668"
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp size={30} />
        </a>

        {/* SUCCESS POPUP */}
        {showSuccess && (
          <div className="success-popup">
            Message sent successfully!
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
