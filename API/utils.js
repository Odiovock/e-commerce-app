const bcrypt = require('bcrypt');
const pool = require("./db");

async function bcryptEncryption (string) {
    const salt = await bcrypt.genSalt(10);
    const hashedEntry = await bcrypt.hash(string, salt);
    return hashedEntry;
}

async function bcryptDecription (password, encryptedPassword) {
    const matchedPassword = await bcrypt.compare(password, encryptedPassword);
    return matchedPassword;
}

async function findUserWithEmail (email) {
    const result = await pool.query(
        "SELECT password, id FROM users WHERE email = $1",
        [email]
    );

    if (result.rows.length === 0) {
        return undefined;
    } else {
        return result.rows[0];
    }
}

function generateOrderNumber (user_id) {
    let order_num = "";
    const now = new Date();
    order_num += user_id.toString() + now.getFullYear().toString() + now.getDay().toString() + now.getHours().toString() + now.getHours().toString() +
        now.getSeconds().toString() + now.getMilliseconds().toString();
    return order_num;
}

async function clearCart (cart_id) {
    let isError = undefined;
    try {
        const results = await pool.query("DELETE FROM cart_products WHERE cart_id=$1", [cart_id]);
    } catch (error) {
        isError = error;
    }
    return isError;
}

async function getCartId (user_id) {
    const result = await pool.query("SELECT id FROM carts WHERE user_id=$1", [user_id]);
    if (result.rows.length === 0) {
        return undefined;
    } else {
        return result.rows[0].id;
    }
}

async function getCartContent (cart_id) {
    const result = await pool.query("SELECT product_id, quantity FROM cart_products WHERE cart_id=$1", [cart_id]);
    if (result.rows.length === 0) {
        return {};
    } else {
        return JSON.stringify(result);
    }
}

async function emptyCart (cart_id) {
    try {
        const results = await pool.query("DELETE FROM cart_products WHERE cart_id=$1", [cart_id]);
    } catch (error) {
        console.error(error.toString());
    }
}

// async function isRowFoundWithKey (table, key, value) {
//     try {
//         const results = await pool.query("SELECT $1 FROM $2", [key, table]);
//     } catch (error) {
//          console.error(error.toString());
//     }

//     let isMatch = false;

//     for (const row of results.rows) {
//         if (row.id === parseInt(value)) {
//             isMatch = true;
//         }
//     }

//     return isMatch;
// }

module.exports = {bcryptEncryption, bcryptDecription, findUserWithEmail, generateOrderNumber, clearCart, getCartId, getCartContent, emptyCart};