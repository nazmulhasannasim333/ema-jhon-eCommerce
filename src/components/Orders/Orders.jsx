import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./Orders.css";

const Orders = () => {
  const savedCart = useLoaderData();
  const [cart, setCart] = useState(savedCart);
  //   console.log(savedCart);

  const handleRemoveItem = (id) => {
    const remainingCart = cart.filter((pd) => pd.id !== id);
    setCart(remainingCart);
    removeFromDb(id);
  };

  const handleClearCart = () => {
    setCart([])
    deleteShoppingCart()
  };

  return (
    <div className="shop-container">
      <div className="review-container">
        {cart.map((product) => (
          <ReviewItem
            key={product.id}
            product={product}
            handleRemoveItem={handleRemoveItem}
          ></ReviewItem>
        ))}
      </div>
      <div className="order-cart-container">
        <Cart cart={cart} handleClearCart={handleClearCart}>
        <Link className="checkout-link" to='/checkout'><button className="order-checkout-btn">Proceed Checkout <FontAwesomeIcon icon={faArrowRight} /></button> </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Orders;
