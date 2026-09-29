import { useState, useMemo, useCallback } from "react";
import PageLayout from "../../layouts/PageLayout";
import CareerCard from "../../component/Career/CareerCard/CareerCard.jsx";
import FilterSideBar from "../../component/FilterSideBar/FilterSideBar.jsx";
import JobPagination from "../../component/Career/JobPagination/JobPagination.jsx";
import { JOBS } from "../../component/Career/data.js";
import { FILTER_OPTIONS } from "../../component/Career/data.js";
import "./CareerPage.css";

import HeroImage from "../../Assets/Career/Hero Image.webp";

const JOBS_PER_PAGE = 6;

export default function CareerPage() {
  const [filters, setFilters] = useState({
    area: [],
    job_type: [],
    experience: [],
  });
  const [currentPage, setCurrentPage] = useState(1);

  /* ── Filter ── */
  const filteredJobs = useMemo(() => {
    return JOBS.filter((job) => {
      const areaMatch =
        filters.area.length === 0 || filters.area.includes(job.area);

      const jobTypeMatch =
        filters.job_type.length === 0 ||
        filters.job_type.includes(job.jobType);

      const experienceMatch =
        filters.experience.length === 0 ||
        filters.experience.includes(job.experience);

      return areaMatch && jobTypeMatch && experienceMatch;
    });
  }, [filters]);

  /* ── Pagination ── */
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * JOBS_PER_PAGE;
    return filteredJobs.slice(start, start + JOBS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  /* ── Handlers ── */
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        document
          .getElementById("career-jobs-section")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [totalPages]
  );

  const handleViewDetails = useCallback((job) => {
    console.log("View details for:", job.title, job.jobId);
  }, []);

  // Correctly resets filters back to empty arrays matching the initial state
  const handleClearAllFilters = () => {
    handleFilterChange({
      area: [],
      job_type: [],
      experience: [],
    });
  };

  return (
    <PageLayout
      className="career-main-section"
      showContact={true}
      contactVariant="home"
    >
      {/* ── Hero ── */}
      <div className="career-hero-section">
        <picture>
          <source media="(max-width: 1023px)" srcSet={HeroImage} />
          <img src={HeroImage} alt="Career" />
        </picture>
        <div className="career-hero-overlay">
          <h1 className="career-hero-title">Career</h1>
          <p className="career-hero-subtitle">
            Shape Your Career. Make An Impact
          </p>
        </div>
      </div>

      {/* ── Jobs Section ── */}
      <section id="career-jobs-section" className="career-jobs-section">
        <div className="career-jobs-section__header">
          <h2 className="career-jobs-section__title">
            Build Your Future With Us
          </h2>
          <p className="career-jobs-section__subtitle">
            Join Us and Grow with Purpose
          </p>
        </div>

        <div className="career-jobs-section__body">
          {/* Sidebar (Will lock to the top of view when scrolling) */}
          <aside className="career-jobs-section__sidebar">
            <FilterSideBar
              type="career"
              filterOptions={FILTER_OPTIONS}
              onFilterChange={handleFilterChange}
            />
          </aside>

          {/* Cards + Pagination (Scrolls independently) */}
          <main className="career-jobs-section__main">
            {paginatedJobs.length > 0 ? (
              <div className="career-card-grid">
                {paginatedJobs.map((job) => (
                  <CareerCard
                    key={job.id}
                    job={job}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="career-jobs-empty">
                <p>No jobs match your selected filters.</p>
                <button
                  className="career-jobs-empty__reset"
                  onClick={handleClearAllFilters}
                >
                  Clear All Filters
                </button>
              </div>
            )}

            <JobPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </main>
        </div>
      </section>
    </PageLayout>
  );
}