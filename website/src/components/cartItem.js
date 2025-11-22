import React, {useEffect, useState} from "react";
import { getImage, formatPrice } from "../utils";
import styles from "../style/cart.module.css";
import styles2 from "../style/productdetails.module.css";
import { useOutletContext } from "react-router-dom";

// Now that /cart/content returns sku, name, price directly we can render without extra fetch.

function CartItem({ productId, quantity, sku, name, price, image }) {
    const [itemQuantity, setItemQuantity] = useState(quantity);
    const {cartItemCount, setCartItemCount, cartContent, setCartContent} = useOutletContext();

    async function updateCart (newQuantity) {
        let newCart = [...cartContent];
        const product = newCart.find(item => item.product_id === productId);

        if (product && newQuantity > 0) {
            product.quantity = newQuantity;
        } else if (product && newQuantity === 0) {
            newCart = newCart.filter(item => item.product_id !== productId);
        } else {
            newCart.push({ product_id: productId, quantity: newQuantity, sku});
        }

        setCartContent(newCart);

        try {
            const response = await fetch("http://localhost:3000/addtocart", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    newCart
                })
            });

            if (!response.ok) {
                throw new Error("Could not update cart");
            }
        } catch (error) {
            console.log(error);
        }
    }

    function onQuantityInputChange (e) {
        if (e.target.value < 1 || e.target.value === undefined || e.target.value === null) {
            setItemQuantity(1);
        } else if (e.target.value > 999) {
            setItemQuantity(999);
        } else {
            setItemQuantity(e.target.value);
        }

        updateCart(parseInt(itemQuantity));
    }

    function onMinusQuantityButtonClick (e) {
        const current = parseInt(itemQuantity);
        const currentCartCount = parseInt(cartItemCount);
        if (current <= 0) {
            setItemQuantity(0);
            return;
        }
        setItemQuantity(current - 1);
        updateCart(current - 1);
    }

    function onPlusQuantityButtonClick (e) {
        const current = parseInt(itemQuantity);
        const currentCartCount = parseInt(cartItemCount);
        if (current >= 999) {
            setItemQuantity(999);
            return;
        }
        setItemQuantity(current + 1);
        updateCart(current + 1);
    }

    return (
        <div className={styles.cartItem}>
            <img src={getImage(image)} alt={name} style={{height:'150px',objectFit:'cover'}} className={styles.onethirdWidth} />
            <div className={[styles.cartItemDetails, styles.onethirdWidth].join(" ")}>
                <p>Name: {name}</p>
                <p>SKU: {sku}</p>
                <p>Price: ${formatPrice(price)}</p>
            </div>
            <div className={[styles2.quantityInputWrapper, styles.onethirdWidth].join(" ")}>
                <button className={styles2.minusButton} onClick={onMinusQuantityButtonClick} type="button">-</button>
                <input type="number" value={itemQuantity} max={999} className={styles2.counterInput} onChange={onQuantityInputChange} required/>
                <button className={styles2.plusButton} onClick={onPlusQuantityButtonClick} type="button">+</button>
            </div>
        </div>
    );
}

export default CartItem;