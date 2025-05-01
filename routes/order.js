const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../db');

const orderRouter = express.Router();

orderRouter.use(bodyParser.json());

orderRouter.use("/:id", async (req, res, next) => {
    const result = await pool.query("SELECT id FROM orders");
    let isMatch = false;

    for (const row of result.rows) {
        if (row.id === parseInt(req.params.id)) {
            isMatch = true;
        }
    }

    if (isMatch) {
        next();
    } else {
        res.status(404).send("Order not found.");
    }
});

orderRouter.get("/", async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM orders");
        const json = JSON.stringify(results.rows);
        res.status(200).send(json);
    } catch (error) {
        res.status(500).send("Could not querry database");
    }
});

orderRouter.post("/", async (req, res) => {

});

orderRouter.get("/:id", async (req, res) => {

});

orderRouter.put("/:id", async (req, res) => {

});

orderRouter.delete("/:id", async (req, res) => {

});



module.exports = orderRouter;