const express = require("express");
const bodyParser = require("body-parser");
const pool = require("../db");
const {generateOrderNumber} = require("../utils");

const checkoutRouter = express.Router();

checkoutRouter.use(bodyParser.json());

checkoutRouter.use("/:id", async (req, res, next) => {
    const result = await pool.query("SELECT cart_id FROM cart_products");
    let isMatch = false;

    for (const row of result.rows) {
        if (row.cart_id === parseInt(req.params.id)) {
            isMatch = true;
        }
    }

    if (isMatch) {
        next();
    } else {
        res.status(404).send("Cart is either empty or invalid.");
    }
});

checkoutRouter.post("/:id", async (req, res) => {
    let user_id;
    try  {
        const results = await pool.query("SELECT user_id FROM carts WHERE id=$1", [req.params.id]);
        user_id = results.rows[0].user_id;
    } catch (error) {
        console.error(error.toString());
        res.status(500).send("An error occured");
        return;
    }

    let cart_details;
    try {
        const results = await pool.query("SELECT product_id, quantity FROM cart_products WHERE cart_id=$1", [req.params.id]);
        cart_details = results;
    } catch (error) {
        console.error(error.toString());
        res.status(500).send("An error occured");
        return;
    }

    let user_address;
    try {
        const results = await pool.query("SELECT address FROM users WHERE id=$1", [user_id]);
        user_address = results.rows[0].address;
    } catch (error) {
        console.error(error.toString());
        res.status(500).send("An error occured");
        return;
    }

    const order_num = generateOrderNumber(user_id);
    let order_id;
    try {
        const results = await pool.query(
            "INSERT INTO orders (user_id, order_num, delivery_address) VALUES($1, $2, $3) RETURNING id",
            [user_id, order_num, user_address]
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
        const results = await pool.query(query, params);
        res.status(200).send("Order Completed");
    } catch (error) {
        console.error(error.toString());
        res.status(500).send("An error occured");
        return;
    }
})

module.exports = checkoutRouter;