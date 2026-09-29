import "./JobPagination.css";

const ChevronLeft = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M7.5 2.25L3.75 6L7.5 9.75"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M4.5 2.25L8.25 6L4.5 9.75"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function JobPagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav className="pagination" aria-label="Job listings pagination">
      <button
        className="pagination__btn pagination__arrow"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft />
      </button>

      {getPageNumbers().map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className="pagination__ellipsis">
            ...
          </span>
        ) : (
          <button
            key={page}
            className={`pagination__btn pagination__number ${
              currentPage === page ? "pagination__number--active" : ""
            }`}
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        className="pagination__btn pagination__arrow"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight />
      </button>
    </nav>
  );
}