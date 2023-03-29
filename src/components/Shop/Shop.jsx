import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[]);
    useEffect(() => {
        let saveCart = []
        const storedCart = getShoppingCart()
        // step 1: loop in to stored cart and get id
        for(const id in storedCart){
            // step 2: get product by using id
            const addedProduct = products.find(product => product.id === id);
            // step 3: get quantity of the product
            if(addedProduct){
                const quantity = storedCart[id]
                addedProduct.quantity = quantity;
                // step 4: add the added product to the saveCart
                saveCart.push(addedProduct)
            }
        }
        setCart(saveCart)
    }, [products])

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart)
        addToDb(product.id)
    }
    
    return (
        <div className='shop-container'>
            <div className='product-container'>
            {
                    products.map(product => <Product product={product} key={product.id} handleAddToCart={handleAddToCart}></Product>)
                }
            </div>
            <div >
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;