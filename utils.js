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

module.exports = {bcryptEncryption, bcryptDecription, findUserWithEmail};