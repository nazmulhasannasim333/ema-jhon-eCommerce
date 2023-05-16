import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { totalProducts } = useLoaderData(); //total number of item
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  // console.log(totalPages);

  const pageNumbers = [...Array(totalPages).keys()];
  // console.log(pageNumbers);

  const handleSelectChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };


  useEffect(() => {
    // Use an API call or fetch data from server here
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);
      const data = await response.json();
      setProducts(data);
    };
    fetchData();
  }, [currentPage, itemsPerPage]);




  useEffect(() => {
    let saveCart = [];
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);

    fetch(`http://localhost:5000/productsById`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(ids),
  })
  .then(res => res.json())
  .then(productCart => {
     // step 1: loop in to stored cart and get id
     for (const id in storedCart) {
      // step 2: get product by using id
      const addedProduct = productCart.find((product) => product._id === id);
      // step 3: get quantity of the product
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        // step 4: add the added product to the saveCart
        saveCart.push(addedProduct);
      }
    }
    setCart(saveCart);
  })

   
  }, []);

  const handleAddToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product._id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <>
      <div className="shop-container">
        <div className="product-container">
          {products.map((product) => (
            <Product
              product={product}
              key={product._id}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>
        <div>
          <Cart cart={cart} handleClearCart={handleClearCart}>
            <Link className="checkout-link" to="/orders">
              <button className="order-checkout-btn">
                Review Order <FontAwesomeIcon icon={faCreditCard} />
              </button>
            </Link>
          </Cart>
        </div>
      </div>
      {/* Pagination */}
      <div className="pagination">
        <p>Current Page: {currentPage} Item Perpage: {itemsPerPage}</p>
      {pageNumbers.map((number) => (
        <button  key={number}
        onClick={()=> setCurrentPage(number)}
        className={number == currentPage ? "active" : ""}
        >
            {number +1}
        </button>
      ))}

     <select className="dropdwon" value={itemsPerPage} onChange={handleSelectChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </>
  );
};

export default Shop;
