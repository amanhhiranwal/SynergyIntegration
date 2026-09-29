import { useState } from "react";
import { JOBS, PAGE_CONTENT } from "../data";
import "./CareerDetail.css";
import HeroImage from "../../../Assets/Career/Hero Image.webp";
import PageLayout from "../../../layouts/PageLayout";
import { useNavigate, useParams } from "react-router-dom";
import ApplicationForm from "../ApplicationForm/ApplicationForm";
/* ---------- Icons (inline, no dependency) ---------- */
const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

/* ---------- Reusable section ---------- */
const Section = ({ title, children }) => (
  <section className="cd-section">
    <h2 className="cd-section-title">{title}</h2>
    {children}
  </section>
);

/* ---------- Page ---------- */
function CareerDetail() {
  const [activeTab, setActiveTab] = useState("description");

  const { jobId } = useParams();
  const navigate = useNavigate();

  const job =JOBS.find((item) => item.jobId === jobId);

  // const job = JOB_DETAILS[jobId];
  const C = PAGE_CONTENT;

  if (!job) {
    return (
      <div className="cd-page">
        <p className="cd-placeholder">Job not found.</p>
      </div>
    );
  }

  return (
    <PageLayout>
      {/* ── Hero ── */}
      <div className="career-hero-section">
        <picture>
          <source media="(max-width: 1023px)" srcSet={HeroImage} />
          <img src={HeroImage} alt="Career" />
        </picture>
        <div className="career-hero-overlay-details">
          <h1 className="career-hero-title">Career</h1>
          <p className="career-hero-subtitle">
            Shape Your Career. Make An Impact
          </p>
        </div>
      </div>

      <div className="cd-page">
        {/* Header */}
        <header className="cd-header">
          <h1 className="cd-title">{C.heading}</h1>
          <p className="cd-subtitle">{C.subheading}</p>
        </header>

        <div className="cd-shell">
          {/* Back */}
          {/* <button className="cd-back" onClick={onBack}> */}
          <button className="cd-back" onClick={() => navigate("/career")}>

            <ChevronLeft />
            <span>{C.backLabel}</span>
          </button>

          {/* Tabs */}
          <div className="cd-tabs">
            
            {C.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`cd-tab ${
                  activeTab === tab.id ? "cd-tab--active" : ""
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Card */}
          <div className="cd-card">
            {activeTab === "form" ? (
              // <p className="cd-placeholder">
              //   Application form will appear here.
              // </p>
              <ApplicationForm
    jobTitle={job.title}
    jobId={job.jobId}
    onDone={() => navigate("/career")}
  />
            ) : (
              <>
                <h2 className="cd-job-title">{job.title}</h2>

                {/* Meta pills */}
                <div className="cd-meta">
                  <span className="cd-pill">Experience: {job.experience}</span>
                  <span className="cd-pill">
                    <ClockIcon />
                    {job.jobType}
                  </span>
                  <span className="cd-pill">
                    <PinIcon />
                    {job.locations.join(", ")}
                  </span>
                </div>

                <p className="cd-jobid">Job ID: {job.jobId}</p>

                {/* Description */}
                <Section title={C.sections.description}>
                  <p className="cd-text">{job.description}</p>
                </Section>

                {/* Responsibilities */}
                <Section title={C.sections.responsibilities}>
                  <ul className="cd-list">
                    {job.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Section>

                {/* Eligibility */}
                <Section title={C.sections.eligibility}>
                  <div className="cd-eligibility">
                    {job.eligibility.map((row) => (
                      <p className="cd-eligibility-row" key={row.label}>
                        <span className="cd-eligibility-label">
                          {row.label}:{" "}
                        </span>
                        <span className="cd-eligibility-value">
                          {row.value}
                        </span>
                      </p>
                    ))}
                  </div>
                </Section>

                {/* Skills */}
                <Section title={C.sections.skills}>
                  <div className="cd-chips">
                    {job.requiredSkills.map((skill) => (
                      <span className="cd-chip" key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </Section>

                {/* Good to have */}
                <Section title={C.sections.goodToHave}>
                  <ul className="cd-list">
                    {job.goodToHave.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Section>

                <button
                  className="cd-apply"
                  onClick={() => setActiveTab("form")}
                >
                  {C.applyLabel}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      
    </PageLayout>
  );
}

export default CareerDetail;
