import { drivesData } from "./data";
import "./WhatDrivesUs.css";
import { motion } from "framer-motion";

const WhatDrivesUs = () => {
  return (
    <section className="abt-drives-section">
      <div className="abt-drives-container">
        <div className="abt-drives-header">
          <h2 className="abt-drives-title">What Drives Us</h2>
          <p className="abt-drives-subtitle">
            We believe technology should make a difference—creating intelligent
            solutions with thoughtful design and dependable performance. <br /><br />
            Our purpose is simple: build technology people can believe in and
            rely on.
          </p>
        </div>

        <div className="abt-drives-grid">
          {drivesData.map((item, index) => (
            <motion.div
              key={item.id}
              className={`abt-drives-card ${
                index < 2 ? "abt-drives-card-large" : "abt-drives-card-small"
              }`}
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <motion.img
                src={item.image}
                alt={item.title}
                className="abt-drives-card-img"
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.15 },
                }}
                transition={{
                  type: "spring",
                  mass: 1,
                  stiffness: 120,
                  damping: 15,
                }}
              />
              <div className="abt-drives-card-overlay"></div>
              <div className="abt-drives-card-content">
                <h3 className="abt-drives-card-title">{item.title}</h3>
                <p className="abt-drives-card-desc">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatDrivesUs;
