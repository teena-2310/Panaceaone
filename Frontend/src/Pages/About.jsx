import React from "react";
import Slider from "react-slick";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./About.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function About() {

  const highlights = [
    {
      img: "/images/natural-healing.png",
      title: "Natural Healing",
      description: "Use of herbs and natural remedies for body and mind wellness.",
    },
    {
      img: "/images/energy-healing.png",
      title: "Energy Healing",
      description: "Balancing energy fields for mental clarity and emotional stability.",
    },
    {
      img: "/images/pranic-healing.png",
      title: "Pranic Healing",
      description: "Harnessing prana (life energy) to improve health and vitality.",
    },
    {
      img: "/images/reiki.png",
      title: "Reiki Therapy",
      description: "Gentle hands-on healing to reduce stress and promote harmony.",
    },
    {
      img: "/images/flower-remedies.png",
      title: "Flower Remedies",
      description: "Natural flower essences to enhance emotional balance.",
    },
    {
      img: "/images/mind-wellness.png",
      title: "Mind Wellness",
      description: "Techniques to reduce anxiety, boost focus, and calm the mind.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      <Navbar />

      <div className="about-container">
        <h1 id="about">About Panacea One</h1>

        <p className="tagline">மனம், உடல், ஆன்மா ஒரே அலைவரிசையில்</p>

        <p className="intro">
          Panacea One என்பது மனம், உடல் மற்றும் ஆன்மா ஆகிய மூன்றையும்
          ஒருங்கிணைத்து சமநிலையை உருவாக்கும் ஒரு முழுமையான
          ஹீலிங் தளம் ஆகும்.
        </p>

        <p>
          இங்கு இயற்கை மருத்துவம், Energy Healing, பிராணிக் ஹீலிங்,
          ரேகி, மலர் மருந்துகள், மற்றும் மனநல சிகிச்சைகள்
          ஒருங்கிணைக்கப்பட்டு வழங்கப்படுகின்றன.
        </p>

        {/* Highlights Carousel */}
        <div className="about-highlights-carousel">
          <Slider {...settings}>
            {highlights.map((item, index) => (
              <div className="highlight-card" key={index}>
                <img src={item.img} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </Slider>
        </div>

       {/* Vision & Mission Section with Images */}

<div className="vm-section">

  {/* Mission */}
  <div className="vm-row">
    <img
      src="/images/mission.jpg"
      alt="Mission"
      className="vm-image"
    />

    <div className="vm-text">
      <h2>Mission</h2>
      <p>
        Healing-ஐ ஒரு வணிகமாக அல்லாமல், ஆன்மீக சேவையாக
        வழங்கி மனஅழுத்தம், பயம் மற்றும் வாழ்க்கை குழப்பங்களை
        தீர்த்து முழுமையான நலநிலைக்குக் கொண்டு செல்லுதல்.
      </p>
    </div>
  </div>

  {/* Vision */}
  <div className="vm-row reverse">
    <div className="vm-text">
      <h2>Vision</h2>
      <p>
        மனிதர்களின் வாழ்க்கையில் அமைதி, தெளிவு மற்றும்
        உள்நல சமநிலையை உருவாக்குவதே Panacea One-ன்
        நீண்டகால நோக்கமாகும்.
      </p>
    </div>

    <img
      src="/images/vision.png"
      alt="Vision"
      className="vm-image"
    />
  </div>

</div>




        {/* Why Choose Us */}
        <div className="about-why-us">
          <h2>Why Choose Us?</h2>

          <div className="why-us-grid">
            <div className="why-us-card">
              <img src="https://img.icons8.com/fluency/96/nature.png" />
              <h3>Holistic Healing</h3>
              <p>We integrate mind, body, and soul.</p>
            </div>

            <div className="why-us-card">
              <img src="https://img.icons8.com/fluency/96/leaf.png" />
              <h3>Natural Ingredients</h3>
              <p>100% natural and safe remedies.</p>
            </div>

            <div className="why-us-card">
              <img src="https://img.icons8.com/fluency/96/teacher.png" />
              <h3>Experienced Practitioners</h3>
              <p>Certified Reiki & Energy healers.</p>
            </div>

            <div className="why-us-card">
              <img src="https://img.icons8.com/fluency/96/conference-call.png" />
              <h3>Personalized Care</h3>
              <p>Sessions tailored to your needs.</p>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}
