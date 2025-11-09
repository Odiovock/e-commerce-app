import React from "react";
import styles from "../style/productdisplay.module.css";
import { useNavigate } from "react-router-dom";
import { getImage, formatPrice } from "../utils";

function Product ({id, sku, name, price, image}) {
    const navigate = useNavigate();

    function handleOnTileClick (e) {
        e.preventDefault();
        navigate(`/product/${sku}/${id}`)
    }

    return (
        <div className={styles.productTile} onClick={handleOnTileClick}>
            <img 
                src={getImage(image)}
                alt={name}
                className={styles.productImage}
            />
            <h3 className={styles.productName}>{name}</h3>
            <p className={styles.productPrice}>{formatPrice(price)}</p>
            <p className={styles.productSku}>SKU: {sku}</p>
        </div>
    );
}

export default Product;