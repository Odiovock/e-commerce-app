import React, {useEffect, useState} from "react";
import Order from "../../components/order";
import styles from "../../style/order.module.css";

function OrderHistory () {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch("http://localhost:3000/orders", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"  // This will send cookies with the request
                });
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    console.error("Failed to fetch orders");
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        }
        fetchOrders();
    }, []);

    return (
        <div className={styles.orderContainer}>
            <h1 className={styles.orderTitle}>Order History</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map(order => (
                    <Order
                        key={order.id}
                        orderId={order.id}
                        price={order.price}
                        orderNumber={order.order_num}

                    />
                ))
            )}
        </div>
    );
}

export default OrderHistory;