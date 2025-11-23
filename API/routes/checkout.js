const express = require("express");
const bodyParser = require("body-parser");
const pool = require("../db");
const {generateOrderNumber, clearCart} = require("../utils");

const checkoutRouter = express.Router();

checkoutRouter.use(bodyParser.json());

checkoutRouter.post("/", async (req, res) => {
    let cart_details;
    try {
        const results = await pool.query("SELECT product_id, quantity FROM cart_products WHERE cart_id=$1", [req.session.cartId]);
        cart_details = results;
    } catch (error) {
        console.error(error.toString());
        res.status(500).send("An error occured");
        return;
    }

    const order_num = generateOrderNumber(req.session.userId);
    let order_id;
    let price = parseFloat(req.body.total).toFixed(2);
    try {
        const results = await pool.query(
            "INSERT INTO orders (user_id, order_num, price) VALUES($1, $2, $3) RETURNING id",
            [req.session.userId, order_num, price]
        )
        order_id = results.rows[0].id;
    } catch (error) {
        console.error(error.toString());
        res.status(500).send("An error occured");
        return;
    }

    let query = "INSERT INTO order_products (order_id, product_id, quantity) VALUES ";
    let params = [];
    let i = 0;
    let paramId = 1;
    for (const row of cart_details.rows) {
        if (i === 0) {
            query += `($${paramId}`;
            paramId++;
            params.push(order_id);
        } else {
            query += `, ($${paramId}`;
            paramId++;
            params.push(order_id);
        }
        i++;

        for (const param in row) {
            if (param === "product_id" || param === "quantity") {
                query += `, $${paramId}`;
                paramId++;
                params.push(row[param]);
            }
        }
        query += ")";
    }

    try {
        const notCleared = await clearCart(req.session.cartId);
        if(notCleared) {
            console.log(notCleared);
            res.status(400).send("Could not clear cart");
        } else {
            const results = await pool.query(query, params);
            res.status(200).send("Order Completed");
        }
    } catch (error) {
        console.error(error.toString());
        res.status(500).send("An error occured");
        return;
    }
})

module.exports = checkoutRouter;