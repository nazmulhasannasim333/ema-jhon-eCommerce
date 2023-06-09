import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Cart.css';

const Cart = ({cart, handleClearCart, children}) => {
    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0
    for(const product of cart){
        product.quantity = product.quantity || 1;
        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping ;
        quantity = quantity + product.quantity;
    }
    const tax = totalPrice * 7 / 100;
    const grandTotal = totalPrice + totalShipping + tax;
    return (
        <div className='cart-container'>
            <h2 >Order summery</h2>
                <div className='cart-info'>
                <p>Selected Items: {quantity}</p>
                <p>Total Price: ${totalPrice}</p>
                <p>Total Shipping Charge: ${totalShipping}</p>
                <p>Tax: ${tax.toFixed(2)}</p>
                <h5>Grand Total: {grandTotal.toFixed(2)}</h5>
                </div>
                <button onClick={handleClearCart} className='clear-cart-btn'>Clear Cart <FontAwesomeIcon icon={faTrashAlt} /></button>
                {children}
        </div>
    );
};

export default Cart;