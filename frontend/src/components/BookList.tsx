/*
This component is responsible for getting the book data from the API and compiling it 
into a list of cards. Note that this page also uses the bootstrap grid to display the book cards.
*/

import { useEffect, useState } from "react";
import type { book } from "../types/book";
import BookCard from "./BookCard";

function BookList({ selectedCategories, sortOrder, pageNum, setPageNum }: { selectedCategories: string[]; sortOrder: string; pageNum: number; setPageNum: (num: number) => void; }) {
  const [books, setBooks] = useState<book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [numPages, setNumPages] = useState<number>(0);

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((c) => `bookCategories=${encodeURIComponent(c)}`)
        .join("&");

      const response = await fetch(
        `https://localhost:5000/api/Bookstore?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ""}`
      );
      const data = await response.json();
      setBooks(data.books);
      setNumPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  return (
    <div className="container py-4">
      {/* Toolbar */}
      <div className="d-flex align-items-center gap-2 mb-4">
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
      </div>

      {/* Book grid */}
      <div className="row g-4">
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
  );
}

export default BookList;