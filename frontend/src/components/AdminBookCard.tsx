import { useState } from 'react';
import type { book } from "../types/book";

function AdminBookCard({ bookID, title, author, publisher, isbn, classification, category, pageCount, price }: book) {

    return (
        <div className="col-md-4">
            <div className="card shadow-sm h-100">
                <div className="card-body">
                    <h5 className="card-title text-primary mb-1">{title}</h5>
                    <h6 className="card-subtitle mb-3 text-muted text-uppercase small fw-bold">
                        Author: {author} | Publisher: {publisher}
                    </h6>
                    <div className="border-top pt-2">
                        <p className="card-text mb-0 small"><span className="fw-semibold">ISBN:</span> {isbn}</p>
                        <p className="card-text mb-0 small"><span className="fw-semibold">Classification:</span> {classification}</p>
                        <p className="card-text mb-0 small"><span className="fw-semibold">Category:</span> {category}</p>
                        <p className="card-text mb-0 small"><span className="fw-semibold">Page Count:</span> {pageCount}</p>
                        <p className="card-text mb-0 small"><span className="fw-semibold">Price:</span> ${price.toFixed(2)}</p>
                    </div>
                    <button className="btn btn-primary mt-3" onClick={setEditingBook(book)}>
                        Edit
                    </button>
                    <button className="btn btn-danger mt-3" onClick={handleDeleteBook(bookID)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminBookCard;