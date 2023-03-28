import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Product.css';

const Product = (props) => {
    // console.log(props)
    const {img, name, price, seller, ratings, id} = props.product;
    const handleAddToCart = props.handleAddToCart;

    
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
            <h5 className='product-name'>{name}</h5>
            <p className='product-price'>Price: ${price}</p>
            <p className='product-seller'>Manufacturer: {seller}</p>
            <p className='product-rating'>Rating {ratings} star</p>
            </div>
            <button onClick={()=> handleAddToCart(props.product)} className='product-btn'>Add to cart <FontAwesomeIcon icon={faShoppingCart} /></button>
        </div>
    );
};

export default Product;