/* This component came directly from the videos. Simply displays a little button in the top right with the 
total price of the cart. The user can press it to go to the cart. I did add zIndex: 9999 so that the cart
summary would float on top of my BookCard component.
*/

import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartSummary () {
    const navigate = useNavigate();
    const { cart } = useCart();
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const numItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div style={{
            position: 'fixed',
            top: '10px',
            right: '20px',
            background: '#f8f9fa',
            padding: '10px 15px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            fontSize: '16px',
            zIndex: 9999,
        }}
            onClick={() => navigate('/cart')}
        >
            🛒
            <span className="text-muted small">{numItems} {numItems === 1 ? 'item' : 'items'}</span>
            <strong>${totalAmount.toFixed(2)}</strong>
        </div>
    );
};

export default CartSummary;