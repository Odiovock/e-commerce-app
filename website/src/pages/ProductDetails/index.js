import React, {useState, useEffect} from "react";
import { useParams  } from "react-router-dom";

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

    console.log(productData);
    return (
        <div>
            You querried {productData.name} successfully!
        </div>
    );
} 

export default ProductDetails;