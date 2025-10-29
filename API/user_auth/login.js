const express = require("express");
const bodyParser = require("body-parser");
const { bcryptDecription, findUserWithEmail } = require("../utils");

const loginRoute = express.Router();

loginRoute.use(bodyParser.json());

loginRoute.post("/", async (req, res) => {
    const {email, password} = req.body;
    try {
        const response = await findUserWithEmail(email);
        if (!response) {
            res.status(404).send("User not found")
            return;
        }

        const isPasswordIsMatched = await bcryptDecription(password, response);
        if (!isPasswordIsMatched) {
            res.status(400).send("Incorrect password");
            return;
        }

        res.status(200).send("SomeDay I will validate the session");
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = loginRoute;