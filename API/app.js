const express = require('express');
const app = express();
const PORT = 3000;
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const store = new session.MemoryStore();

const pool = require('./db');

const registerRoutes = require("./user_auth/register");
const loginRoutes = require("./user_auth/login");
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');
const cartRoutes = require('./routes/cart');
const productRoutes = require('./routes/product');
const addtocartRoutes = require("./routes/addtocart");
const checkoutRoutes = require("./routes/checkout");

// Enable CORS with credentials
app.use(cors({
    origin: 'http://localhost:3001', // Your React app's URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        secure: false, // set to true if using https
        httpOnly: true,
        sameSite: 'lax'
    },
    resave: true,
    saveUninitialized: true,
    store
}));

app.get('/', (req, res) => {
    try {
        pool.query('SELECT NOW()', (err, result) => {
            if (err) {
                console.error('Error executing query', err.stack);
                res.status(500).send('Database error');
            } else {
                res.send(`Current time: ${result.rows[0].now}, Database connected successfully!`);
            }
        });
    } catch (error) {
        console.error('Error connecting to the database', error);
        res.status(500).send('Database connection error');
    }
});

app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/carts', cartRoutes);
app.use("/addtocart", addtocartRoutes);
app.use("/checkout", checkoutRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});