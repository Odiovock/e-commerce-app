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
        "SELECT password FROM users WHERE email = $1",
        [email]
    );

    if (result.rows.length === 0) {
        return undefined;
    } else {
        return result.rows[0].password;
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

module.exports = {bcryptEncryption, bcryptDecription, findUserWithEmail};