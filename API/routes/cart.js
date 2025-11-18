const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../db');

const cartRouter = express.Router();

cartRouter.use(bodyParser.json());

cartRouter.get("/", async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM carts");
        const json = JSON.stringify(results.rows);
        res.status(200).send(json);
    } catch (error) {
        res.status(500).send("Could not querry database");
    }
});

cartRouter.get("/content", async (req, res) => {
    try {
        if (!req.session || !req.session.cartId) {
            return res.status(200).json([]); // no cart yet
        }
        const results = await pool.query(
            `SELECT cp.product_id, cp.quantity, p.sku, p.name, p.price, p.image
             FROM cart_products cp
             JOIN products p ON cp.product_id = p.id
             WHERE cp.cart_id = $1`,
            [req.session.cartId]
        );
        return res.status(200).json(results.rows);
    } catch (error) {
        console.error(error.toString());
        res.status(500).send("An error occured");
    }
});

cartRouter.put("/:id", async (req, res) => {
    const {user_id} = req.body;

    try {
        const result = await pool.query("UPDATE carts SET user_id=$1 WHERE id=" + req.params.id, [user_id]);
        res.status(204).send();
    } catch (error) {
        console.error(error.toString());
        res.status(500).send("An error as occured");
    }
});

cartRouter.delete("/:id", async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM carts WHERE id=$1", [req.params.id]);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occured");
    }
});



module.exports = cartRouter;