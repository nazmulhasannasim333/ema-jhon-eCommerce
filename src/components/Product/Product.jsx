import React from 'react';
import './Product.css';

const Product = (props) => {
    console.log(props)
    const {img, name, price, seller, ratings} = props;
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
            <h5 className='product-name'>{name}</h5>
            <p className='product-price'>Price: ${price}</p>
            <p className='product-seller'>Manufacturer: {seller}</p>
            <p className='product-rating'>Rating {ratings} star</p>
            </div>
            <button className='product-btn'>Add to cart</button>
        </div>
    );
};

export default Product;