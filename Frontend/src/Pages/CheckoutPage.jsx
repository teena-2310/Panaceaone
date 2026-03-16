import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

export default function CheckoutPage({ cartItems }) {
  const navigate = useNavigate();

  const [step, setStep] = useState("details");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    phone: ""
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (step === "success") {
      const timer = setTimeout(() => {
        localStorage.removeItem("cart");
        navigate("/");
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step, navigate]);

  // ===============================
  // HANDLE INPUT CHANGE
  // ===============================
  const handleCustomerChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, "");
      setCustomer({ ...customer, phone: onlyNumbers });
    } else {
      setCustomer({ ...customer, [name]: value });
    }
  };

  // ===============================
  // VALIDATION FUNCTIONS
  // ===============================
  const validateDetails = () => {
    let newErrors = {};

    if (!customer.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!customer.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!customer.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(customer.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const validateUpload = () => {
    let newErrors = {};

    if (!transactionId.trim()) {
      newErrors.transactionId = "Transaction ID is required";
    }

    if (!screenshot) {
      newErrors.screenshot = "Please upload payment proof";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ===============================
  // HANDLE CONTINUE
  // ===============================
  const handleContinue = () => {
    if (validateDetails()) {
      setStep("payment");
    }
  };

  // ===============================
  // HANDLE SUBMIT
  // ===============================
  const handleSubmitOrder = async () => {
    if (!validateUpload()) return;

    setLoading(true);

    try {
      const formDataObj = new FormData();

      formDataObj.append("name", customer.name.trim());
      formDataObj.append("address", customer.address.trim());
      formDataObj.append("phone", customer.phone.trim());
      formDataObj.append("payment", paymentMethod);
      formDataObj.append("transactionId", transactionId.trim());
      formDataObj.append("total", total);
      formDataObj.append("items", JSON.stringify(cartItems));
      formDataObj.append("screenshot", screenshot);

      const response = await fetch(
        "http://localhost:5000/api/send-order",
        {
          method: "POST",
          body: formDataObj
        }
      );

      const data = await response.json();

      if (data.success) {
        setStep("success");
      } else {
        setErrors({ submit: "Failed to submit order. Try again." });
      }
    } catch (error) {
      setErrors({ submit: "Server error. Please try later." });
    }

    setLoading(false);
  };

  const isDetailsValid =
    customer.name.trim() &&
    customer.address.trim() &&
    /^[0-9]{10}$/.test(customer.phone) &&
    paymentMethod;

  const isUploadValid =
    transactionId.trim() && screenshot;

  return (
    <div className="checkout-page">
    <div className="checkout-container">
      <div className="checkout-card">

        {/* STEP 1 */}
        {step === "details" && (
          <>
            <h2>Checkout</h2>

            <h3>Order Summary</h3>
            {cartItems.map(item => (
              <p key={item.id}>
                {item.title} × {item.quantity}
              </p>
            ))}
            <h3>Total: ₹{total}</h3>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={customer.name}
              onChange={handleCustomerChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={customer.address}
              onChange={handleCustomerChange}
            />
            {errors.address && <span className="error">{errors.address}</span>}

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              maxLength="10"
              value={customer.phone}
              onChange={handleCustomerChange}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select Payment Method</option>
              <option value="UPI">UPI</option>
              <option value="Bank">Bank Transfer</option>
            </select>
            {errors.paymentMethod && (
              <span className="error">{errors.paymentMethod}</span>
            )}

            <button
              onClick={handleContinue}
              disabled={!isDetailsValid}
            >
              Continue
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === "payment" && (
          <>
            <h3>Payment Details</h3>

            {paymentMethod === "UPI" && (
              <div className="payment-box">
                <p>Scan QR or pay ₹{total} to:</p>
                <strong>9498103668@sbi</strong>
                <img src="/images/gpay-qr.png" alt="UPI QR" width="200" />
              </div>
            )}

            {paymentMethod === "Bank" && (
              <div className="payment-box">
                <p><strong>Account Name:</strong> DHANASEKAR S</p>
                <p><strong>Bank:</strong> State Bank of India</p>
                <p><strong>Account Number:</strong> 20078164404</p>
                <p><strong>IFSC:</strong> SBIN0018292</p>
                <p>Transfer ₹{total} and click below.</p>
              </div>
            )}

            <div className="button-group">
              <button className="back-btn" onClick={() => setStep("details")}>
                Back
              </button>
              <button onClick={() => setStep("upload")}>
                I Have Paid
              </button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === "upload" && (
          <>
            <h3>Upload Payment Proof</h3>

            <input
              type="text"
              placeholder="Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
            {errors.transactionId && (
              <span className="error">{errors.transactionId}</span>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setScreenshot(e.target.files[0])}
            />
            {errors.screenshot && (
              <span className="error">{errors.screenshot}</span>
            )}

            {errors.submit && (
              <span className="error">{errors.submit}</span>
            )}

            <div className="button-group">
              <button className="back-btn" onClick={() => setStep("payment")}>
                Back
              </button>

              <button
                onClick={handleSubmitOrder}
                disabled={!isUploadValid || loading}
              >
                {loading ? "Submitting..." : "Submit Order"}
              </button>
            </div>
          </>
        )}

        {/* SUCCESS */}
        {step === "success" && (
          <div className="success-box">
            <h3>Order Submitted Successfully 🎉</h3>
            <p>Waiting for admin verification.</p>
            <p>Redirecting to Home...</p>
          </div>
        )}

      </div>
    </div>
    </div>
  );
}