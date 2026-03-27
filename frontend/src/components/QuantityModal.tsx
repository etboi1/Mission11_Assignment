/* This component is a popup for the user to select the quantity of books they want to purchase when they
press the "Add to Cart" button on a BookCard component. This is the second new thing I learned how to do in 
bootstrap. Below is an explanation of what each bootstrap class does:

Backdrop
    - modal-backdrop — creates the dark overlay that covers the rest of the page behind the modal
    - fade — makes it semi-transparent rather than fully opaque black
    - show — actually applies the visible state (without this it would be hidden)

Outer modal div
    - modal — the base class that sets up positioning and scroll behavior for the modal container
    - fade — enables the fade-in transition animation
    - show — makes the modal visible (same as backdrop)
    - d-block — overrides Bootstrap's default display: none on modals, since we're controlling visibility with React state rather than Bootstrap's JS

Dialog div
    - modal-dialog — centers the modal horizontally and sets its max width
    - modal-dialog-centered — also centers it vertically on the screen

Inner divs
    - modal-content — the white rounded box that contains everything; applies the background, border, and border-radius
    - modal-header — adds padding and a bottom border to separate the header from the body
    - modal-title — sizes and weights the heading text appropriately
    - modal-body — adds consistent padding around the main content
    - modal-footer — adds padding and a top border, and uses flexbox to right-align the buttons
*/

import { useState } from "react";
import type { book } from "../types/book";

function QuantityModal({ book, onConfirm, onCancel }: {
    book: book;
    onConfirm: (quantity: number) => void;
    onCancel: () => void;
}) {
    const [quantity, setQuantity] = useState<number>(1);
    const subtotal = quantity * book.price;

    return (
        <>
            <div className="modal-backdrop fade show" />
            <div className="modal fade show d-block" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add to Cart</h5>
                            <button className="btn-close" onClick={onCancel} />
                        </div>
                        <div className="modal-body">
                            {/* Title and author */}
                            <div className="text-center mb-4">
                                <p className="fw-semibold fs-4 text-primary mb-0">{book.title}</p>
                                <p className="text-muted small mb-0">by {book.author}</p>
                            </div>

                            {/* Quantity and price row */}
                            <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                                <label className="form-label fw-semibold mb-0">Quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    style={{ width: '75px' }}
                                    min={1}
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                                />
                                <span className="text-muted">${book.price.toFixed(2)} each</span>
                            </div>

                            <p className="fw-bold text-center">Subtotal: ${subtotal.toFixed(2)}</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                            <button className="btn btn-primary" onClick={() => onConfirm(quantity)}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuantityModal;