import "./CareerCard.css";

import IconClock from "../../../Assets/Career/clock.svg";
import IconLocation from "../../../Assets/Career/location.svg";
import { useNavigate } from "react-router-dom";



export default function CareerCard({ job }) {
  const { title, jobType, locations, experience, jobId, description } = job;
  const navigate = useNavigate();

  return (
    <article className="job-card">
      <div className="job-card__content">
        <h3 className="job-card__title">{title}</h3>

        <div className="job-card__tags">
          <span className="job-card__tag">
            <img src={IconClock} alt="" />
            {jobType}
          </span>
          <span className="job-card__tag">
            <img src={IconLocation} alt="" />
            {locations.join(", ")}
          </span>
        </div>

        <span className="job-card__tag job-card__tag--experience">
          Experience: {experience}
        </span>

        <p className="job-card__job-id">
          <strong>Job ID:</strong> {jobId}
        </p>

        <p className="job-card__description">{description}</p>
      </div>

      <button
        className="job-card__btn"
          onClick={() =>    navigate(`/career-details/${jobId}`)}

        aria-label={`View details for ${title}`}
      >
        View Details
      </button>
    </article>
  );
}