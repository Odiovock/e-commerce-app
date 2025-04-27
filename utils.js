const bcrypt = require('bcrypt');

async function bcryptEncryption (string) {
    const salt = await bcrypt.genSalt(10);
    const hashedEntry = await bcrypt.hash(string, salt);
    return hashedEntry;
}

async function bcryptDecription (string) {

}

module.exports = {bcryptEncryption, bcryptDecription};