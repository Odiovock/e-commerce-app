const express = require('express');
const app = express();
const PORT = 3000;

const pool = require('./db');

const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');
const cartRoutes = require('./routes/cart');
const productRoutes = require('./routes/product');

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

app.use('/users', userRoutes);
// app.use('/orders', orderRoutes);
// app.use('/cart', cartRoutes);
// app.use('/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});