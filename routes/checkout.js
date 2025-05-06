const express = require("express");
const bodyParser = require("body-parser");
const pool = require("../db");

const checkoutRouter = express.Router();

checkoutRouter.use(bodyParser.json());

checkoutRouter.use(async (req, res, next) => {
    const result = await pool.query("SELECT cart_id FROM cart_products");
    let isMatch = false;

    for (const row of result.rows) {
        if (row.id === parseInt(req.params.id)) {
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
    const results = await pool.query("SELECT * FROM cart_products WHERE cart_id=$1", [req.params.id]);

    for (const row of results.rows) { 
    }
})

module.export = checkoutRouter;