import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import { AuthContext } from '../providers/AuthProvider';
import './Header.css';
const Header = () => {
    const {user, logOut} = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
        .then(result => {})
        .catch(error => {
            console.log(error);
        })
    }
    return (
        <nav className='header'>
            <Link to="/"><img src={logo} alt="" /></Link>
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Order Review</Link>
                <Link to="/inventory">Inventory</Link>
                {
                    user ? 
                    <>
                    <span className='user-email'>{user.email}</span>
                    <Link className='sign-btn' onClick={handleLogout} to="/login">Logout</Link>
                    </> : 
                    <>
                    <Link className='sign-btn' to="/login">Login</Link>
                    </>
                    
                }
                
            </div>
        </nav>
    );
};

export default Header;