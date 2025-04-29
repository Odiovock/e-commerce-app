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

productRoutes.use("/:id", async (req, res, next) => {
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
    const params = req.body;

    let query = "UPDATE products SET ";
    let i = 1;
    for (const param in params) {
        if (param === "name" || param === "description" || param === "price" || param === "sku")
        {
            if (i > 1)  {
                query += ",";
            }
            query += `${param}=$${i} `;
            i++;
        }
    }
    query += `WHERE id=$${i}`;

    const paramList = [...Object.values(params), req.params.id];

    try {
        const result = await pool.query(query, paramList);
        res.status(204).send();
    } catch (error) {
        console.error(error.toString());
        res.status(500).send("An error as occured");
    }
});

productRoutes.delete("/:id", async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM products WHERE id=$1", [req.params.id]);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occured");
    }
});

productRoutes.post("/", async (req, res) => {
    const {name, description, price, sku} = req.body;

    try {
        const results = await pool.query(
            "INSERT INTO products (name, description, price, sku) VALUES ($1, $2, $3, $4) RETURNING id",
            [name, description, price, sku]
        );
        res.status(201).send(`Product created with id: ${results.rows[0].id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occured");
    }
});

module.exports = productRoutes;