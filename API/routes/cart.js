const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../db');

const cartRouter = express.Router();

cartRouter.use(bodyParser.json());

cartRouter.use("/:id", async (req, res, next) => {
    const result = await pool.query("SELECT id FROM carts");
    let isMatch = false;

    for (const row of result.rows) {
        if (row.id === parseInt(req.params.id)) {
            isMatch = true;
        }
    }

    if (isMatch) {
        next();
    } else {
        res.status(404).send("Cart not found.");
    }
});

cartRouter.use("/:id/content", async (req, res, next) => {
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
        res.status(404).send("Invalid cart or cart is empty");
    }
})

cartRouter.get("/", async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM carts");
        const json = JSON.stringify(results.rows);
        res.status(200).send(json);
    } catch (error) {
        res.status(500).send("Could not querry database");
    }
});

cartRouter.get("/:id/content", async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM cart_products WHERE cart_id=$1", [req.params.id]);
        json = JSON.stringify(results.rows);
        res.status(200).send(json);
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