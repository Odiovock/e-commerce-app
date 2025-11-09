import React, {useEffect, useState} from "react";
import styles from "../style/productdetails.module.css";
import { formatPrice  } from "../utils";
import { useParams } from "react-router-dom";

function AddToCart ({price}) {
    const [quantity, setQuantity] = useState(1);
    const [productId, setProductId] = useState(null);

    const id = useParams();

    useEffect(() => {
        setProductId(id);
    }, []);

    function onQuantityInputChange (e) {
        setQuantity(e.target.value);

        if (e.target.value < 1 || e.target.value === undefined || e.target.value === null) {
            setQuantity(1);
        } else if (e.target.value > 999) {
            setQuantity(999);
        }
    }

    function onMinusQuantityButtonCLick (e) {
        const current = parseInt(quantity);
        if (current <= 1) {
            setQuantity(1);
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

        try {
            
        } catch (error) {

        }
    }

    console.log(productId);
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

export default AddToCart 