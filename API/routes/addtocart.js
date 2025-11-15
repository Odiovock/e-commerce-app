const express = require("express");
const bodyParser = require("body-parser");
const pool = require("../db");
const {emptyCart} = require("../utils.js");

const addtocartRouter = express.Router();

addtocartRouter.use(bodyParser.json());

addtocartRouter.post("/", async (req, res) => {
    const {newCart} = req.body;

    try {
        await emptyCart(req.session.cartId);

        for (const {product_id, quantity} of newCart) {
            const results = await pool.query("INSERT INTO cart_products (cart_id, product_id, quantity) VALUES ($1, $2, $3)", [req.session.cartId, product_id, quantity]);
        }
        
        res.status(204).send();
    } catch (error) {
        console.error(error.toString());
        res.status(500).send("An error occured");
    }

});

module.exports = addtocartRouter;