const express = require("express");
const bodyParser = require("body-parser");
const pool = require("../db");

const productRoutes = express.Router();

productRoutes.use(bodyParser.json());

productRoutes.get("/", async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM products");
        const json = JSON.stringify(results.rows);
        res.status(200).send(json);
    } catch (error) {
        res.status(500).send("Could not querry database");
    }
});

productRoutes.get("/:id", async (req, res) => {
    const {id} = req.params;
    const results = await pool.query("SELECT * FROM products WHERE id = $1", [id]);

    if (results.rows.length > 0) {
        const json = JSON.stringify(results.rows[0]);
        res.send(json);
    } else {
        res.status(404).send("Product not found");
    }
});

productRoutes.put("/:id", async (req, res) => {

});

productRoutes.delete("/:id", async (req, res) => {

});

productRoutes.post("/", async (req, res) => {
    const {name, description, price} = req.body;

    try {
        const results = await pool.query(
            "INSERT INTO products (name, description, price) VALUE ($1, $2, $3) RETURNING id",
            [name, description, price]
        );
    } catch (error) {

    }
});

module.exports = productRoutes;