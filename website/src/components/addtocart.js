import React, {useEffect, useState} from "react";
import styles from "../style/productdetails.module.css";
import { formatPrice  } from "../utils";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function AddToCart ({price, name, image}) {
    const [quantity, setQuantity] = useState(0);
    const [productId, setProductId] = useState(null);
    const { cartContent, setCartContent } = useOutletContext();

    const {id, sku} = useParams();

    useEffect(() => {
        setProductId(parseInt(id));
    }, [id]);

    function onQuantityInputChange (e) {
        if (e.target.value < 1 || e.target.value === undefined || e.target.value === null) {
            setQuantity(1);
        } else if (e.target.value > 999) {
            setQuantity(999);
        } else {
            setQuantity(parseInt(e.target.value));
        }
    }

    function onMinusQuantityButtonCLick (e) {
        const current = parseInt(quantity);
        if (current <= 0) {
            setQuantity(0);
            return;
        }
        setQuantity(current - 1);
    }

    function onPlusQuantityButtonCLick (e) {
        const current = parseInt(quantity);
        if (current >= 999) {
            setQuantity(999);
            return;
        }
        setQuantity(current + 1);
    }


    async function onAddToCartSubmit (e) {
        e.preventDefault();

        if (!quantity > 0) {
            return;
        }

        const newCart = [...cartContent];
        const product = newCart.find(item => item.product_id === productId);
        if (product) {
            if( product.quantity + quantity > 999) {
                product.quantity = 999;
            } else {
                product.quantity += quantity;
            }
        } else {
            newCart.push({ product_id: productId, quantity, sku, name, price, image });
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

    return (
        <form className={styles.addToCartSection} onSubmit={onAddToCartSubmit}>
            <p className={[styles.productPrice, styles.addToCartSpacing].join(" ")}>{formatPrice(price)}</p>
            <div className={[styles.quantityInputWrapper, styles.addToCartSpacing].join(" ")}>
                <button className={styles.minusButton} onClick={onMinusQuantityButtonCLick} type="button">-</button>
                <input type="number" value={quantity} max={999} className={styles.counterInput} onChange={onQuantityInputChange} required/>
                <button className={styles.plusButton} onClick={onPlusQuantityButtonCLick} type="button">+</button>
            </div>
            <button type="submit" className={styles.addToCartButton}>Add to cart</button>
        </form>
    );
}

export default AddToCart;