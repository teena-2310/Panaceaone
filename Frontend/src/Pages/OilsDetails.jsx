import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./OilDetails.css";
import oils from "../Data/OilsData";


const oils = [
  {
    slug: "life-flow-oil",
    img: "oil-life-flow.png",
    title: "Panacea One – Life Flow Oil",
    fullDesc:
      "This oil supports emotional release, energy circulation, and life alignment. Ideal for restoring positivity and inner clarity.",
  },
  {
    slug: "pain-relief-oil",
    img: "oil-pain-relief.png",
    title: "Panacea One – Pain Relief Oil",
    fullDesc:
      "Relieves body pain, stiffness, and inflammation by calming nerves and improving energy flow.",
  },
  // add others same way
];

export default function OilDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const oil = oils.find((o) => o.slug === slug);

  if (!oil) return <h2>Oil not found</h2>;

  return (
    <>
      <Navbar />

      <div className="oil-details-page">
        <img src={oil.img} alt={oil.title} className="details-img" />
        <h1>{oil.title}</h1>
        <p>{oil.fullDesc}</p>

        <button className="buy-now">Buy Now</button>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <Footer />
    </>
  );
}
