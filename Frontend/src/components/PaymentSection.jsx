import React from "react";

const PaymentSection = () => {
  return (
    <section className="py-10 bg-gray-100 text-center">
      <h2 className="text-2xl font-semibold mb-4">Payment Options</h2>
      <p className="mb-6">You can pay using the following methods:</p>

      <div className="space-y-6">

        <div>
          <h3 className="text-lg font-medium">🇮🇳 UPI Payment</h3>
          <p>UPI ID: <b>dhanasekar@okaxis</b></p>
        </div>

        <div>
          <h3 className="text-lg font-medium">🏦 Bank Transfer</h3>
          <p>
            Account Name: Dhanasekar <br />
            Bank: SBI <br />
            Account No: XXXXXXXX <br />
            IFSC: XXXXXXXX
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium">🌍 International Payment</h3>
          <a
            href="https://www.paypal.me/YOURUSERNAME"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            Click Here to Pay via PayPal
          </a>
        </div>

      </div>
    </section>
  );
};

export default PaymentSection;
