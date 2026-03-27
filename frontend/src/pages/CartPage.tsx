/* This page displays the content of the cart, including quantity, price, and subtotal for each book that is 
added, as required per the assignment requirements. It also includes the total for the cart.
*/

import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types/CartItem";

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useCart();
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="container py-5" style={{ maxWidth: '720px' }}>
            <h2 className="fw-bold mb-4">🛒 Your Cart</h2>

            {cart.length === 0 ? (
                <div className="text-center py-5 text-muted">
                    <p className="fs-5">Your cart is empty.</p>
                    <button className="btn btn-primary mt-2" onClick={() => navigate('/')}>
                        Browse Books
                    </button>
                </div>
            ) : (
                <>
                    <div className="card shadow-sm mb-4">
                        <ul className="list-group list-group-flush">
                            {cart.map((item: CartItem) => (
                                <li key={item.bookID} className="list-group-item d-flex justify-content-between align-items-center py-3">
                                    <div>
                                        <p className="fw-semibold mb-0">{item.title}</p>
                                        <small className="text-muted">
                                            ${item.price.toFixed(2)} × {item.quantity}
                                        </small>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => removeFromCart(item.bookID)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="card shadow-sm p-4 mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="fs-5 fw-bold">Total</span>
                            <span className="fs-4 fw-bold text-primary">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="d-flex gap-3 justify-content-end">
                        <button className="btn btn-outline-secondary" onClick={() => navigate('/')}>
                            ← Continue Browsing
                        </button>
                        <button className="btn btn-primary px-4">
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartPage;