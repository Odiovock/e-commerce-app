import React, {useEffect, useState} from "react";
import Product from "./product";
import styles from "../style/productdisplay.module.css";

function ProductDisplay () {
    const [products, setProducts] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

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

    // Calculate pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products ? products.slice(indexOfFirstProduct, indexOfLastProduct) : null;
    const totalPages = products ? Math.ceil(products.length / productsPerPage) : 0;

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={styles.container}>
            <div className={styles.productsGrid}>
                {currentProducts ? currentProducts.map((product) => (
                    <Product 
                        key={product.sku} 
                        sku={product.sku} 
                        name={product.name} 
                        price={product.price}
                        image={product.image}
                    />
                )) : (
                    <div className={styles.loading}>
                        <p>Loading products...</p>
                    </div>
                )}
            </div>
            {products && (
                <div className={styles.pagination}>
                    <button 
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={styles.pageButton}
                    >
                        Previous
                    </button>
                    <span className={styles.pageInfo}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button 
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={styles.pageButton}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProductDisplay;