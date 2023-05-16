import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./ReviewItem.css";

const ReviewItem = ({ product, handleRemoveItem }) => {
  const { _id, img, name, price, quantity } = product;

  return (
    <div className="review-item">
      <img src={img} alt="" />
      <div className="review-details">
        <p className="product-title">{name}</p>
        <p>
          Price: <span className="orange-text">${price}</span>
        </p>
        <p>
          Quantity: <span className="orange-text">{quantity}</span>
        </p>
      </div>
      <button onClick={() => handleRemoveItem(_id)} className="delete-btn">
        <FontAwesomeIcon className="delete-icon" icon={faTrashAlt} />
      </button>
    </div>
  );
};

export default ReviewItem;
