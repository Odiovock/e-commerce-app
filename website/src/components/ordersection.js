import React, {useEffect, useState} from "react";
import { formatPrice  } from "../utils";
import styles from "../style/cart.module.css";

function OrderSection ({cartContent, setCartContent}) {
    async function onCheckoutButtonClick (e) {
        e.preventDefault();
        
        try {
            const response = await fetch("http://localhost:3000/checkout", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include",
            });
            if (response.ok) {
                async function fetchCartContent () {
                    try {
                        const response = await fetch("http://localhost:3000/carts/content", {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            credentials: "include"  // This will send cookies with the request
                        });
        
                        if (!response.ok) {
                            throw new Error("Could not fetch cart content");
                        }
                        const result = await response.json();
                        setCartContent(result);
                    } catch (error) {
                        console.log(error);
                    }
                }
                fetchCartContent();
            }
        } catch (error) {
            console.error("Checkout failed:", error);
        }
    }

    return (
        <div className={styles.orderSection}>
            <h2>Order Summary</h2>
            <div className={styles.orderDetails}>
                <p className={styles.productPrice}>
                    Total : {formatPrice(cartContent.reduce((total, item) => total + item.price * item.quantity, 0))}
                </p>
                <button className={styles.button} onClick={onCheckoutButtonClick}>Checkout</button>
            </div>
        </div>
    );
}

export default OrderSection;