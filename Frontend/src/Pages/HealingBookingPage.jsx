import React, { useState, useEffect } from "react";
import "./HealingBookingPage.css";
import { useNavigate, useParams } from "react-router-dom";

const HealingBookingPage = () => {
  const [step, setStep] = useState("select");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const { bookingId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (step === "success") {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step, navigate]);

  return (
    <div className="healing-container">
      <div className="healing-card">
        <button className="back-button" onClick={() => navigate("/")}>
          ←
        </button>

        {step === "select" && (
          <>
            <h2 className="healing-title">Healing Session</h2>
            <p className="healing-subtitle">One-to-One Energy Healing • ₹200</p>

            <div className="healing-field">
              <label>Select Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">Choose</option>
                <option value="UPI">UPI</option>
                <option value="Bank">Bank Transfer</option>
              </select>
            </div>

            <button
              className="healing-button primary"
              onClick={() => setStep("details")}
            >
              Continue
            </button>
          </>
        )}

        {step === "details" && (
          <>
            <h3 className="healing-title-small">Payment Details</h3>

            {paymentMethod === "UPI" && (
              <div className="healing-payment-box">
                <p className="pay-instruction">Scan QR or pay ₹200 to:</p>

                <div className="upi-id-box">
                  <strong>9498103668@sbi</strong>
                </div>

                <div className="qr-wrapper">
                  <img
                    src="/images/gpay-qr.png"
                    alt="UPI QR"
                    className="qr-image"
                  />
                </div>

                <p className="pay-note">After payment, click "I Have Paid"</p>
              </div>
            )}

            <button
              className="healing-button success"
              onClick={() => setStep("upload")}
            >
              I Have Paid
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default HealingBookingPage;
