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

        // Set session data
        req.session.authenticated = true;
        req.session.email = email; // Assuming response has user ID
        
        // Save session explicitly
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ error: 'Failed to create session' });
            }
            res.status(200).json({ 
                message: "Login successful",
                user: {
                    email: response.email,
                    id: response.id
                }
            });
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = loginRoute;