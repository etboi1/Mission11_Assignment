/* This is the main page of the website - the Book Page. This page is designed using the bootstrap grid in order
to layout a sidebar and a place for the main content. The sidebar contains all of the sorting and filtering logic
and the  main content holds the list of books available to purchase.
*/

import { useState } from "react";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import Header from "../components/Header";
import CartSummary from "../components/CartSummary";

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("none");
  const [pageNum, setPageNum] = useState<number>(1);

  return (
    <>
      <Header />
      <CartSummary />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-2 px-3 py-4">
            <div className="sticky-top pt-3">
              <h6 className="text-uppercase fw-bold text-muted mb-3">Sort</h6>
              <button
                className="btn btn-outline-secondary btn-sm w-100 mb-2"
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
              >
                Title {sortOrder === "asc" ? "↑" : sortOrder === "desc" ? "↓" : "↕"}
              </button>
              {sortOrder !== "none" && (
                <button
                  className="btn btn-outline-danger btn-sm w-100 mb-3"
                  onClick={() => setSortOrder("none")}
                >
                  ✕ Clear Sort
                </button>
              )}

              <hr />

              <CategoryFilter
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                setPageNum={setPageNum}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="col-md-10">
            <BookList selectedCategories={selectedCategories} sortOrder={sortOrder} pageNum={pageNum} setPageNum={setPageNum} />
          </div>
        </div>
      </div>
    </>
  );
}

export default BooksPage;