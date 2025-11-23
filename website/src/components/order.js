import React from "react";
import { formatPrice } from "../utils";
import styles from "../style/order.module.css";
import { useNavigate } from "react-router-dom";

function Order ({orderId, price, orderNumber, items}) {
    const navigate = useNavigate();

    function handleOnClick (e) {
        e.preventDefault();
        navigate(`/orders/${orderId}`);
    }
    return (
        <div className={styles.orderItem} onClick={handleOnClick}>
            <div className={styles.orderItemHeader}>
                <span className={styles.orderItemName}>Order #{orderNumber}</span>
                <span className={styles.orderTotal}>Total: {formatPrice(price)}</span>
            </div>
            {items && items.length > 0 && (
                <ul className={styles.orderList}>
                    {items.map((item, idx) => (
                        <li key={idx} className={styles.orderItemDetails}>
                            {item.name} x{item.quantity} — {formatPrice(item.price)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Order;