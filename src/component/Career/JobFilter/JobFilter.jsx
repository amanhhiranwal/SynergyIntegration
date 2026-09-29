import { useState } from "react";
import "./JobFilter.css";

/* ── Inline SVG Chevrons ── */

const ChevronUp = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M3.5 8.75L7 5.25L10.5 8.75"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M3.5 5.25L7 8.75L10.5 5.25"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ── Collapsible Filter Group ── */

function FilterGroup({ title, options, selected, onChange }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="filter-group">
      <button
        className="filter-group__header"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        type="button"
      >
        <span className="filter-group__title">{title}</span>
        <span className="filter-group__icon" aria-hidden="true">
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </span>
      </button>

      {isOpen && (
        <div className="filter-group__options">
          {options.map((option) => (
            <label key={option} className="filter-group__label">
              <input
                type="checkbox"
                className="filter-group__checkbox"
                checked={selected.includes(option)}
                onChange={() => onChange(option)}
              />
              <span className="filter-group__text">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Sidebar ── */

export default function JobFilter({ filterOptions, filters, onFilterChange }) {
  const handleToggle = (category, value) => {
    const current = filters[category] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ ...filters, [category]: updated });
  };

  return (
    <aside className="filter-sidebar" aria-label="Job filters">
      <FilterGroup
        title="Job Type"
        options={filterOptions.jobType}
        selected={filters.jobType || []}
        onChange={(val) => handleToggle("jobType", val)}
      />
      <FilterGroup
        title="Experience"
        options={filterOptions.experience}
        selected={filters.experience || []}
        onChange={(val) => handleToggle("experience", val)}
      />
    </aside>
  );
}