import "./GravityAI.css";
import gravityanimation from "../../Assets/ifp/gravity-ai.mp4";
import image1 from "../../Assets/gravity/Image.webp";
import image2 from "../../Assets/gravity/Image 2.webp";
import image3 from "../../Assets/gravity/Image 3.webp";
import image4 from "../../Assets/gravity/Image 4.webp";
import video2 from "../../Assets/gravity/shopping cart 1.mp4";
import video3 from "../../Assets/gravity/magic pen 01 1 (1).mp4";
import video4 from "../../Assets/gravity/crypto 1.mp4";
import video1 from "../../Assets/gravity/Create Shapes 1.mp4";

const features = [
  {
    title: "Chat With Documents:",
    desc: "Upload documents and ask questions about their content.",
    img: image4,
    video: video2,
  },
  {
    title: "Create Shapes:",
    desc: "Convert drawings into accurate shapes for better teaching.",
    img: image3,
    video: video1,
  },
  {
    title: "Magic Pen:",
    desc: "Recognizes and interprets hand drawn doodles.",
    img: image2,
    video: video3,
  },
  {
    title: "Mind Map:",
    desc: "Generate complex mind maps with the click of a button.",
    img: image1,
    video: video4,
  },
];

export default function GravityAI() {
  return (
    <>
      <section className="gravity-section">
        <div className="container">
          <div className="text-center mb-0">
            <h1 className="gravity-title">Gravity Ai Integration</h1>
            <p className="gravity-subtitle">
              Enhance user interaction with intelligent features
            </p>
          </div>

          <div className="gravity-screen-wrap">
            <div className="gravity-monitorss">
              <video
                asp
                className="gravity-gif"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
              >
                <source src={gravityanimation} type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="d-flex gravity-cards-row">
            {features.map((f, i) => (
              <div className="gravity-card" key={i}>
                <p className="gravity-card-title">{f.title}</p>
                <p className="gravity-card-desc">{f.desc}</p>
                <video
                  className="gravity-card-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                >
                  <source src={f.video} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}