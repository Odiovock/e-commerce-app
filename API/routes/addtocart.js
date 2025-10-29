const express = require("express");
const bodyParser = require("body-parser");
const pool = require("../db");

const addtocartRouter = express.Router();

addtocartRouter.use(bodyParser.json());

addtocartRouter.use("/", async (req, res, next) => {
    const cart_result = await pool.query("SELECT id FROM carts");
    const product_result = await pool.query("SELECT id FROM products");
    let isValidCart = false;
    let isValidProduct = false;

    for (const row of cart_result.rows) {
        if (row.id === parseInt(req.body.cart_id)) {
            isValidCart = true;
        }
    }

    for (const row of product_result.rows) {
        if (row.id === parseInt(req.body.product_id)) {
            isValidProduct = true;
        }
    }

    if (isValidCart && isValidProduct) {
        next();
    } else {
        if(!isValidCart) {
            res.status(404).send("Invalid cart");
        } else {
            res.status(404).send("Invalid product");
        }
    }
});

addtocartRouter.post("/", async (req, res) => {
    const {cart_id, product_id, quantity} = req.body;

    try {
        const results = pool.query("INSERT INTO cart_products (cart_id, product_id, quantity) VALUES ($1, $2, $3)", [cart_id, product_id, quantity]);
        res.status(204).send();
    } catch (error) {
        console.error(error.toString());
        res.status(500).send("An error occured");
    }

});

module.exports = addtocartRouter;