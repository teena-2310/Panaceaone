import React, { useState, useEffect } from "react";
import "./HealingBookingPage.css";
import { useNavigate } from "react-router-dom";

const HealingBookingPage = () => {
  const [step, setStep] = useState("select");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState(null);

  const navigate = useNavigate(); // ✅ Added

  // ✅ Auto redirect after success (3 seconds)
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

        {/* 🔙 Back Button */}
        <button
          className="back-button"
          onClick={() => navigate("/")}
        >
          ←
        </button>

        {/* STEP 1 */}
        {step === "select" && (
          <>
            <h2 className="healing-title">Healing Session</h2>
            <p className="healing-subtitle">
              One-to-One Energy Healing • ₹500
            </p>

            <div className="healing-field">
              <label>Select Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">Choose</option>
                <option value="UPI">UPI (Google Pay / PhonePe)</option>
                <option value="Bank">Bank Transfer</option>
              </select>
            </div>

            <button
              className="healing-button primary"
              onClick={() => {
                if (!paymentMethod) {
                  alert("Please select payment method");
                  return;
                }
                setStep("details");
              }}
            >
              Continue
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === "details" && (
          <>
            <h3 className="healing-title-small">Payment Details</h3>

            {paymentMethod === "UPI" && (
              <div className="healing-payment-box">
                <p>Pay ₹500 to this UPI ID:</p>
                <strong>yourupi@bank</strong>
              </div>
            )}

            {paymentMethod === "Bank" && (
              <div className="healing-payment-box">
                <p><strong>Account Name:</strong> Your Name</p>
                <p><strong>Account Number:</strong> 1234567890</p>
                <p><strong>IFSC:</strong> ABCD0001234</p>
                <p><strong>Bank:</strong> Your Bank Name</p>
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

        {/* STEP 3 */}
        {step === "upload" && (
          <>
            <h3 className="healing-title-small">Upload Payment Proof</h3>

            <div className="healing-field">
              <label>Transaction ID</label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
              />
            </div>

            <div className="healing-field">
              <label>Upload Screenshot</label>
              <input
                type="file"
                onChange={(e) => setScreenshot(e.target.files[0])}
              />
            </div>

            <button
              className="healing-button secondary"
              onClick={() => {
                if (!transactionId || !screenshot) {
                  alert("Please fill all fields");
                  return;
                }
                setStep("success");
              }}
            >
              Submit Payment
            </button>
          </>
        )}

        {/* STEP 4 */}
        {step === "success" && (
          <div className="healing-success">
            <h3>Payment Submitted Successfully 🎉</h3>
            <p>Waiting for admin verification.</p>
            <p>Redirecting to Home...</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default HealingBookingPage;
