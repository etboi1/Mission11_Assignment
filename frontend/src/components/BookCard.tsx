/* This component displays all the information for one book, as well as allows a user to add the book to
the cart.

NOTE: I INTENTIONALLY did not reroute the user to the cart page after adding a book, because it seemed like bad
user flow to me. Often users want to continue browsing or add more items to cart before checking out. By
redirecting to cart immediately, we would probably be decreasing add-on sales.
*/

import { useState } from 'react';
import type { book } from "../types/book";
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/CartItem';
import QuantityModal from './QuantityModal';

function BookCard({ bookID, title, author, publisher, isbn, classification, category, pageCount, price }: book) {
    const { addToCart } = useCart();
    const [showModal, setShowModal] = useState(false);

    const handleConfirm = (quantity: number) => {
        const newItem: CartItem = { bookID, title, price, quantity };
        addToCart(newItem);
        setShowModal(false);
    };

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
                    <button className="btn btn-primary mt-3" onClick={() => setShowModal(true)}>
                        Add to Cart
                    </button>
                </div>
            </div>

            {showModal && (
                <QuantityModal
                    book={{ bookID, title, author, publisher, isbn, classification, category, pageCount, price }}
                    onConfirm={handleConfirm}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </div>
    );
}

export default BookCard;