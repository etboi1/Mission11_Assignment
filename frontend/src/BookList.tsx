/*
This component is responsible for getting the book data from the API and compiling it 
into a list of cards
*/

import { useEffect, useState } from "react";
import type { book } from "./types/book";
import BookCard from "./BookCard";

function BookList() {
    const [books, setBooks] = useState<book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [numPages, setNumPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<string>("none");

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(`https://localhost:5000/api/Bookstore?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}`);
            const data = await response.json();
            console.log(data);
            setBooks(data.books);
            setNumPages(Math.ceil(data.totalNumBooks / pageSize));
        }

        fetchBooks();
    }, [pageSize, pageNum, sortOrder]);

    return (
<div className="container py-4">
      {/* Toolbar */}
      <div className="d-flex align-items-center gap-2 mb-4 flex-wrap">
        <label className="d-flex align-items-center gap-2 mb-0">
          <span className="text-muted small">Results per page:</span>
          <select
            className="form-select form-select-sm w-auto"
            onChange={(p) => {
              setPageSize(Number(p.target.value));
              setPageNum(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </label>

        <div className="vr" />

        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() =>
            sortOrder === "none" || sortOrder === "desc"
              ? setSortOrder("asc")
              : setSortOrder("desc")
          }
        >
          Sort by Title
        </button>

        {sortOrder !== "none" && (
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => setSortOrder("none")}
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* Book grid */}
      <div className="row g-4 p-5">
        {books.map((b) => (
          <BookCard key={b.bookID} {...b} />
        ))}
      </div>

      {/* Pagination */}
      <nav className="d-flex justify-content-center mt-4">
        <ul className="pagination mb-0">
          <li className={`page-item ${pageNum === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPageNum(pageNum - 1)}>
              ← Prev
            </button>
          </li>

          {[...Array(numPages)].map((_, i) => (
            <li key={i + 1} className={`page-item ${pageNum === i + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => setPageNum(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${pageNum === numPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPageNum(pageNum + 1)}>
              Next →
            </button>
          </li>
        </ul>
      </nav>
    </div>
    )
}

export default BookList;