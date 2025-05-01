const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../db');
const {bcryptEncryption} = require('../utils');

const registerRouter = express.Router();

registerRouter.use(bodyParser.json());

registerRouter.post("/", async (req, res) => {
    const {first_name, last_name, email, phone, password} = req.body;
    const encryptedPassword = await bcryptEncryption(password);

    try {
        const result = await pool.query(
            "INSERT INTO users (first_name, last_name, email, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING id",
            [first_name, last_name, email, phone, encryptedPassword]
        );
        const cart = await pool.query(
            "INSERT INTO carts (user_id) VALUES($1)",
            [result.rows[0].id]
        );
        res.status(201).send(`User added with ID: ${result.rows[0].id}`);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = registerRouter