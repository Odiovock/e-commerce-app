import React, {useEffect, useState} from "react";
import { formatPrice, getImage } from "../utils";
import styles from "../style/cart.module.css";
import styles2 from "../style/productdetails.module.css";

function OrderItem ({sku, name, price, image, quantity}) {
    return (
        <div className={styles.cartItem}>
            <img src={getImage(image)} alt={name} style={{height:'150px',objectFit:'cover'}} className={styles.onethirdWidth} />
            <div className={[styles.cartItemDetails, styles.onethirdWidth].join(" ")}>
                <p>Name: {name}</p>
                <p>SKU: {sku}</p>
                <p>Price: ${formatPrice(price)}</p>
            </div>
            <div className={[styles2.quantityInputWrapper, styles.onethirdWidth].join(" ")}>
                <p>Quantity: {quantity}</p>
            </div>
        </div>
    );
}

export default OrderItem;