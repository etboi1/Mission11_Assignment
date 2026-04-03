interface PaginationProps {
    currentPage: number,
    totalPages: number,
    pageSize: number,
    onPageChange: (newPage: number) => void,
    onPageSizeChange: (newSize: number) => void,
}

const Pagination = ({ currentPage, totalPages, pageSize, onPageChange, onPageSizeChange }: PaginationProps) => {
    return (
        <>
        {/* Toolbar */}
        <div className="d-flex align-items-center gap-2">
            <label className="d-flex align-items-center gap-2 mb-0">
            <span className="text-muted small">Results per page:</span>
            <select
                value={pageSize}
                className="form-select form-select-sm w-auto"
                onChange={(p) => {
                    onPageSizeChange(Number(p.target.value));
                    onPageChange(1);
                }}
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
            </label>
        </div>

        {/* Pagination */}
        <nav className="d-flex justify-content-center">
            <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
                    ← Prev
                </button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => onPageChange(i + 1)}>
                    {i + 1}
                    </button>
                </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
                    Next →
                </button>
                </li>
            </ul>
        </nav>
        </>
    );
}

export default Pagination;