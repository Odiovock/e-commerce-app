const bcrypt = require('bcrypt');

async function bcryptEntry (string) {
    const salt = await bcrypt.genSalt(10);
    const hashedEntry = await bcrypt.hash(string, salt);
    return hashedEntry;
}

module.exports = {bcryptEntry};