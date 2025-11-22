import React, {useState, useEffect} from "react";
import { useParams  } from "react-router-dom";
import styles from "../../style/productdetails.module.css";
import { getImage } from "../../utils";
import AddToCart from "../../components/addtocart";

function ProductDetails () {
    const {sku} = useParams();
    const [productData, setProductData] = useState({});

    async function getProductData (sku) {
        try {
            const response = await fetch(`http://localhost:3000/products/${sku}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Could not get product data");
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    useEffect(() => {
        async function fetchData () {
            const data = await getProductData(sku);
            if (data) setProductData(data);
        }

        fetchData();
        document.title = "Drugs.Co  - Product"
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.columns}>
                <img 
                    src={getImage(productData.image)}
                    alt={productData.name}
                    className={styles.productImage}
                />
            </div>
            <div className={styles.columns}>
                <h1>{productData.name}</h1>
                <p>{productData.description}</p>
            </div>
            <div className={styles.columns}>
                <AddToCart name={productData.name} image={productData.image} price={productData.price} sku={productData.sku}/>
            </div>
        </div>
    );
} 

export default ProductDetails;