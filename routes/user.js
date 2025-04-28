const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../db');

const userRouter = express.Router();

userRouter.use(bodyParser.json());

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



module.exports = userRouter;

