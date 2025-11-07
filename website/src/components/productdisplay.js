import React, {useEffect, useState} from "react";
import Product from "./product";

function ProductDisplay () {
    const [products, setProducts] = useState(null);

    async function fetchProducts () {
        try {
            const response = await fetch("http://localhost:3000/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"  // This will send cookies with the request
            });

            if (!response.ok) {
                throw new Error("Could not querry database");
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts();
            console.log('Products fetched:', data); // Debug log
            setProducts(data);
        };
        getProducts();
    }, [])

    return (
        <>
            <h2>
                Khajiit has wears, if you have coins
            </h2>
            {products ? products.map((product) => (
                <Product 
                    key={product.sku} 
                    sku={product.sku} 
                    name={product.name} 
                    price={product.price} 
                />
            )) : <p>Loading products...</p>}
        </>
    )
}

export default ProductDisplay;