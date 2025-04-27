const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../db');
const {bcryptEntry} = require('../utils');

const userRouter = express.Router();

userRouter.use(bodyParser.json());
userRouter.use(
    bodyParser.urlencoded({
        extended: true
    })
);

userRouter.get("/", async (req, res) => {
    try {
        const results = await pool.query("SELECT id, first_name, last_name, email, phone FROM users");
        const json = JSON.stringify(results.rows);
        res.status(200).send(json);
    } catch (error) {
        res.status(500).send("Could not querry database");
    }
});

userRouter.get("/:id", async (req, res) => {

});

userRouter.put("/:id", async (req, res) => {

});

userRouter.delete("/:id", async (req, res) => {

});

userRouter.post("/register", async (req, res) => {
    const {first_name, last_name, email, phone, password} = req.body;
    const encryptedPassword = await bcryptEntry(password);

    try {
        const result = await pool.query(
            "INSERT INTO users (first_name, last_name, email, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING id",
            [first_name, last_name, email, phone, encryptedPassword]
        );
        console.log(result);
        res.status(201).send(`User added with ID: ${result.rows[0].id}`);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = userRouter;

