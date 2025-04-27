const express = require("express");
const bodyParser = require("body-parser");
const pool = require("../db");

const loginRoute = express.Router();

loginRoute.get("/", (res, req) => {
    res.send("Tried to login successfully.");
});

module.exports = loginRoute;