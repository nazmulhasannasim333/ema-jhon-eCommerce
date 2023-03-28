import React from 'react';
import logo from '../../images/Logo.svg';
import './Header.css';
const Header = () => {
    return (
        <nav className='header'>
            <a href="git init"><img src={logo} alt="" /></a>
            <div>
                <a href="/shop">Shop</a>
                <a href="/order">Order Review</a>
                <a href="/inventory">Inventory</a>
                <a href="/login">Login</a>
            </div>
        </nav>
    );
};

export default Header;