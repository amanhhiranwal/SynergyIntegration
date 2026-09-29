import "./MeetOurTeam.css";
import { teamMembers } from "./data.js";

const MeetOurTeam = () => {
  return (
    <section className="mot-section">
      <div className="mot-container">
        <header className="mot-header">
          <h2 className="mot-title">Meet Our Team</h2>

          <p className="mot-subtitle">
            We believe technology should make a difference—creating intelligent
            solutions with thoughtful design and dependable performance.
            <br />
            Our purpose is simple: build technology people can believe in and
            rely on.
          </p>
        </header>

        <div className="mot-grid">
          {teamMembers.map((member) => (
            <article
              key={member.id}
              className="mot-card"
              tabIndex={0}
            >
              <div className="mot-image-wrapper">
                <img
                  src={member.image}
                  alt={member.name}
                  className="mot-image"
                />

                <div className="mot-overlay" />

                <div className="mot-info">
                  <div className="mot-main-text">
                    <h3 className="mot-name">{member.name}</h3>
                    <p className="mot-role">{member.role}</p>
                  </div>

                  {member.description && (
                    <p className="mot-desc">{member.description}</p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeam;