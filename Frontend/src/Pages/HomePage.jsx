import React from "react";
import "./HomePage.css";
import Navbar from "../components/Navbar";
import Footer  from "../components/Footer";

export default function HomePage() {
  return (
    <div className="bg-white text-gray-800" id="home">

      {/* NAVBAR COMPONENT */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="text-center py-20 bg-gradient-to-br from-green-100 to-green-300 px-6">
        <h2 className="text-4xl font-bold text-green-900 leading-snug">
          Panacea One – மனம், உடல், ஆன்மா ஒரே அலைவரிசையில்.
        </h2>

        <p className="text-xl mt-4 text-gray-700">
          Holistic healing through Flower Medicine, Hypno,
          Acupuncture, Reiki & Energy Therapy.
        </p>

        <p className="mt-2 text-lg text-gray-700">
          மருத்துவ செலவு இல்லாமல் நெஞ்சுக்கு நிம்மதி தரும்
          சிகிச்சை — தொலைபேசி மூலமும் கிடைக்கும்.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button className="px-6 py-3 bg-green-700 text-white rounded shadow-lg hover:bg-green-800">
            Book Healing Call
          </button>
          <button className="px-6 py-3 border border-green-700 text-green-700 rounded shadow hover:bg-green-50">
            Know More
          </button>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-16 bg-gray-100 px-8">
        <h2 className="text-3xl font-bold text-center text-green-800">
          Healing Services
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 max-w-6xl mx-auto">
          <div className="box">
            <h3 className="title">Flower Medicine</h3>
            <p>பயம், guilt, stress ஆகியவற்றுக்கான மென்மையான மலர் மருந்துகள்.</p>
          </div>

          <div className="box">
            <h3 className="title">Hypno & Mind Therapy</h3>
            <p>Subconscious healing மூலம் மனஅழுத்தம் release.</p>
          </div>

          <div className="box">
            <h3 className="title">Acupuncture</h3>
            <p>Meridian balance for pain & physical issues.</p>
          </div>

          <div className="box">
            <h3 className="title">Reiki Healing</h3>
            <p>Energy channeling to heal mind & body.</p>
          </div>

          <div className="box">
            <h3 className="title">Phone Healing</h3>
            <p>எங்கு இருந்தாலும் தொலைபேசி மூலம் scan + guidance.</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 px-8">
        <h2 className="text-3xl font-bold text-center text-green-800">
          Contact & Booking
        </h2>

        <p className="mt-6 text-center text-lg">Phone: +91-XXXXXXXXXX</p>
        <p className="text-center text-lg">Email: yourmail@domain.com</p>

        <div className="flex justify-center mt-6">
          <button className="px-6 py-3 bg-green-700 text-white rounded shadow hover:bg-green-800">
            WhatsApp Message
          </button>
        </div>
      </section>

       <Footer/>

    </div>
  );
}
