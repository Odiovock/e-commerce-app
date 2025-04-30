const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../db');

const cartRouter = express.Router();

cartRouter.use(bodyParser.json());

cartRouter.use("/:id", async (req, res, next) => {
    const result = await pool.query("SELECT id FROM products");
    let isMatch = false;

    for (const row of result.rows) {
        if (row.id === parseInt(req.params.id)) {
            isMatch = true;
        }
    }

    if (isMatch) {
        next();
    } else {
        res.status(404).send("Product not found.");
    }
});

cartRouter.get("/", async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM carts");
        const json = JSON.stringify(results.rows);
        res.status(200).send(json);
    } catch (error) {
        res.status(500).send("Could not querry database");
    }
});

cartRouter.post("/", async (req, res) => {

});

cartRouter.get("/:id", async (req, res) => {

});

cartRouter.put("/:id", async (req, res) => {

});

cartRouter.delete("/:id", async (req, res) => {

});



module.exports = cartRouter;