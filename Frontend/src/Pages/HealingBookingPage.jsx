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

        {/* STEP 1 */}
        {step === "select" && (
          <>
            <h2 className="healing-title">Healing Session</h2>
            <p className="healing-subtitle">
              One-to-One Energy Healing • ₹200
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
              onClick={async () => {
  if (!paymentMethod) {
    alert("Please select payment method");
    return;
  }

  try {
    await fetch(
      `/api/bookings/${bookingId}/payment-method`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          paymentMethod
        })
      }
    );

    setStep("details");

  } catch (error) {
    alert("Server error");
  }
}}
            >
              Continue
            </button>
          </>
        )}

        {/* STEP 2 - PAYMENT DETAILS */}
        {step === "details" && (
          <>
            <h3 className="healing-title-small">Payment Details</h3>

            {paymentMethod === "UPI" && (
              <div className="healing-payment-box">
                <p className="pay-instruction">
                  Scan QR or pay ₹200 to:
                </p>

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

                <p className="pay-note">
                  After payment, click "I Have Paid"
                </p>
              </div>
            )}

            {paymentMethod === "Bank" && (
              <div className="healing-payment-box">
                <p><strong>Account Name:</strong> DHANASEKAR S</p>
                <p><strong>Bank:</strong> State Bank of India</p>
                <p><strong>Account Number:</strong> 20078164404</p>
                <p><strong>IFSC:</strong> SBIN0018292</p>
                <p className="pay-note">
                  Please transfer ₹200 and keep screenshot.
                </p>
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

        {/* STEP 3 - UPLOAD */}
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
              onClick={async () => {
                if (!transactionId || !screenshot) {
                  alert("Please fill all fields");
                  return;
                }

                try {
                  const formDataObj = new FormData();
                  formDataObj.append("transactionId", transactionId);
                  formDataObj.append("screenshot", screenshot);

                  const response = await fetch(
                    `http://localhost:5000/api/bookings/${bookingId}/upload-proof`,
                    {
                      method: "POST",
                      body: formDataObj,
                    }
                  );

                  const data = await response.json();

                  if (data.success) {
                    setStep("success");
                  } else {
                    alert("Upload failed");
                  }
                } catch (error) {
                  alert("Server error");
                }
              }}
            >
              Submit Payment
            </button>
          </>
        )}

        {/* STEP 4 - SUCCESS */}
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