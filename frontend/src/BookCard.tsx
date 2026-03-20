/*
This component takes a book and builds a card for that book, returnning it to BookList
*/

import type { book } from "./types/book";

function BookCard({ title, author, publisher, isbn, classification, category, pageCount, price}: book) {
    return (
        <div className="col-md-4">
            <div className="card shadow-sm h-100">
                <div className="card-body">
                    {/* Title */}
                    <h5 className="card-title text-primary mb-1">
                        {title}
                    </h5>

                    {/* Author & Publisher */}
                    <h6 className="card-subtitle mb-3 text-muted text-uppercase small fw-bold">
                        Author: {author} | Publisher: {publisher}
                    </h6>

                    {/* Details */}
                    <div className="border-top pt-2">
                        <p className="card-text mb-0 small">
                            <span className="fw-semibold">ISBN:</span> {isbn}
                        </p>
                        <p className="card-text mb-0 small">
                            <span className="fw-semibold">Classification:</span> {classification}
                        </p>
                        <p className="card-text mb-0 small">
                            <span className="fw-semibold">Category:</span> {category}
                        </p>
                        <p className="card-text mb-0 small">
                            <span className="fw-semibold">Page Count:</span> {pageCount}
                        </p>
                        <p className="card-text mb-0 small">
                            <span className="fw-semibold">Price:</span> {price}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookCard;