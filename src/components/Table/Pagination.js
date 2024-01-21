const ITEMS_PER_PAGE = 10

export const getPaginatedData = ({
  rows,
  currentPage,
}) => {
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  return rows.slice(startIndex, startIndex + ITEMS_PER_PAGE);
};

export const Pagination = ({
  rows,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(rows.length / ITEMS_PER_PAGE);
  const pageNeighbours = 2; // Number of pages to show around the current page

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const getPageRange = () => {
    let start = Math.max(1, currentPage - pageNeighbours);
    let end = Math.min(totalPages, currentPage + pageNeighbours);

    let pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (start > 1) {
      pages.unshift('startEllipsis');
    }

    if (end < totalPages) {
      pages.push('endEllipsis');
    }

    return pages;
  };

  const visiblePages = getPageRange();

  return (
    <div style={{ textAlign: 'right' }}>
      <button
        className="btn btn-sm mx-1"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
      >
        « Previous
      </button>

      {visiblePages.map(page => (
        page === 'startEllipsis' || page === 'endEllipsis' ? (
          <span key={page} className="page-ellipsis">...</span>
        ) : (
          <button
            className="btn btn-sm mx-1"
            key={page}
            onClick={() => goToPage(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        )
      ))}

      <button
        className="btn btn-sm mx-1"
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      >
        Next »
      </button>
    </div>
  )
}