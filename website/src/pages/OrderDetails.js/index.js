import React, {use, useEffect, useState} from "react";
import OrderItem from "../../components/orderitem";
import { useParams } from "react-router-dom";
import styles from "../../style/cart.module.css";

function OrderDetails () {
    const [orderDetails, setOrderDetails] = useState([]);
    const { orderId } = useParams();


    useEffect(() => {
        // Fetch order details based on order number from URL params
        async function fetchOrderDetails() {
            try {
                const response = await fetch("http://localhost:3000/orders/" + orderId, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"  // This will send cookies with the request
                });
                if (response.ok) {
                    const data = await response.json();
                    setOrderDetails(data);
                } else {
                    console.error("Failed to fetch order details");
                }
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        }
        fetchOrderDetails();
    }, []);

    return (
        <div>
            <h1>Order Details Page</h1>
            <div className={styles.cartItemsContainer}>
                {orderDetails.length === 0 ? (
                    <p>No items found for this order.</p>
                ) : (
                    orderDetails.map((item, idx) => (
                        <OrderItem
                            key={idx}
                            name={item.name}
                            sku={item.sku}
                            price={item.price}
                            image={item.image}
                            quantity={item.quantity}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default OrderDetails;