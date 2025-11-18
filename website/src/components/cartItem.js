import React from "react";
import { getImage, formatPrice } from "../utils";
import styles from "../style/cart.module.css";
import styles2 from "../style/productdetails.module.css";

// Now that /cart/content returns sku, name, price directly we can render without extra fetch.
import img1 from '../images/1.jpg';
import img2 from '../images/2.jpg';
import img3 from '../images/3.jpg';

function CartItem({ productId, quantity, sku, name, price, image }) {
    return (
        <div className={styles.cartItem}>
            <img src={getImage(image)} alt={name} style={{height:'150px',objectFit:'cover'}} className={styles.onethirdWidth} />
            <div className={[styles.cartItemDetails, styles.onethirdWidth].join(" ")}>
                <p>Name: {name}</p>
                <p>SKU: {sku}</p>
                <p>Price: ${formatPrice(price)}</p>
            </div>
            <div className={[styles2.quantityInputWrapper, styles.onethirdWidth].join(" ")}>
                <button className={styles2.minusButton} type="button">-</button>
                <input type="number" value={quantity} max={999} className={styles2.counterInput} required/>
                <button className={styles2.plusButton} type="button">+</button>
            </div>
        </div>
    );
}

export default CartItem;