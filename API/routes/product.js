const express = require("express");
const bodyParser = require("body-parser");
const pool = require("../db");

const productRoutes = express.Router();

// Apply JSON parsing middleware
productRoutes.use(bodyParser.json());

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (!req.session) {
        return res.status(500).json({ msg: "Session middleware not properly configured" });
    }
    if (req.session.authenticated) {
        return next();
    }
    return res.status(403).json({ msg: "You are not authenticated" });
};

// Apply authentication middleware to all routes
productRoutes.use(isAuthenticated);

productRoutes.get("/", async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM products");
        const json = JSON.stringify(results.rows);
        res.status(200).send(json);
    } catch (error) {
        res.status(500).send("Could not querry database");
    }
});

productRoutes.get("/:sku", async (req, res) => {
    try {
        const { sku } = req.params;
        const results = await pool.query("SELECT * FROM products WHERE sku = $1", [sku]);

        if (results.rows.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(results.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Database error");
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