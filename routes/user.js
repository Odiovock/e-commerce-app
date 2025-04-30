const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../db');

const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.use("/:id", async (req, res, next) => {
    const result = await pool.query("SELECT id FROM users");
    let isMatch = false;

    for (const row of result.rows) {
        if (row.id === parseInt(req.params.id)) {
            isMatch = true;
        }
    }

    if (isMatch) {
        next();
    } else {
        res.status(404).send("User not found.");
    }
});

userRouter.get("/", async (req, res) => {
    try {
        const results = await pool.query("SELECT id, first_name, last_name, email, phone FROM users");
        const json = JSON.stringify(results.rows);
        res.status(200).send(json);
    } catch (error) {
        res.status(500).send("An error has occured");
    }
});

userRouter.get("/:id", async (req, res) => {
    try {
        const results = await pool.query("SELECT id, first_name, last_name, email, phone FROM users WHERE id=$1", [req.params.id]);
        const json = JSON.stringify(results.rows[0]);

        res.send(results.rows[0]);
    } catch (error) {
        console.error(error.toString());
        res.status(500).send("An error has occured");
    }
});

userRouter.put("/:id", async (req, res) => {
    const params = req.body;

    let query = "UPDATE users SET ";
    let i = 1;
    for (const param in params) {
        if (param === "first_name" || param === "last_name" || param === "email" || param === "phone")
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

userRouter.delete("/:id", async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM users WHERE id=$1", [req.params.id]);
        res.status(204).send();
    } catch (error) {
        console.error(error.toString());
        res.status(500).send("An error occured");
    }
});



module.exports = userRouter;

