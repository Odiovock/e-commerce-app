import React from "react";
import styles from "../style/productdisplay.module.css";
import img1 from '../images/1.jpg';
import img2 from '../images/2.jpg';
import img3 from '../images/3.jpg';

function Product ({sku, name, price, image}) {
    const formatPrice = (price) => {
        try {
            return `$${Number(price).toFixed(2)}`;
        } catch (error) {
            console.error('Error formatting price:', error);
            return `$${price}`;
        }
    };

    const getImage = (imageNumber) => {
        switch(imageNumber) {
            case 1:
                return img1;
            case 2:
                return img2;
            case 3:
                return img3;
            default:
                return img1;
        }
    };

    return (
        <div className={styles.productTile}>
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