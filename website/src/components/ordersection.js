import React, {useEffect, useState} from "react";
import { formatPrice  } from "../utils";
import styles from "../style/cart.module.css";

function OrderSection ({cartContent}) {
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