import React, {useEffect, useState} from "react";
import styles from "../style/header.module.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";


function Header ({cartItemCount = 0}) {
    const navigate = useNavigate();

    function onLinkCLick (e) {
        e.preventDefault();
        navigate(e.target.value);
    }

    return (
        <div className={styles.header}>
            <h1 onClick={() => navigate('/home')}>Drugs.Co</h1>
            <nav className={styles.nav}>
                <NavLink to="/home/products">Products</NavLink>
                <NavLink to="/cart">Cart <span className={styles.cartCount}>{cartItemCount}</span></NavLink>
                <NavLink to="/orders">Orders</NavLink>
            </nav>
        </div>
    );
}

export default Header; 