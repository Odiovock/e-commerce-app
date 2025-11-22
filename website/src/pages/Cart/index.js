import React, {useEffect, useState} from "react";
import { useOutletContext } from "react-router-dom";
import CartItem from "../../components/cartItem";
import styles from "../../style/cart.module.css";
import OrderSection from "../../components/ordersection";

function Cart() {
    const { cartContent, setCartContent } = useOutletContext();

    return (
        <div>
            <h1>Shopping Cart</h1>
            <div className={styles.cartItemsContainer}>
                {cartContent && cartContent.length > 0 ? (
                    cartContent.map((item) => (
                        <CartItem 
                            key={item.product_id + '-' + item.sku}
                            productId={item.product_id} 
                            quantity={item.quantity} 
                            sku={item.sku}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                        />
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
                <OrderSection cartContent={cartContent} setCartContent={setCartContent} />
            </div>
        </div>
    );
}

export default Cart;