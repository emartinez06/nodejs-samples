// Import dependencies
const jwt = require("jsonwebtoken");
const encrypter = require("cryptr");
require('dotenv').config();

// Secrets
const {SECRET_1,SECRET_2} = process.env;

// Encrypter
const encryptedSecret = new encrypter(SECRET_1);

// Generate the product key
function generate(type) {
    return encryptedSecret.encrypt(jwt.sign({ type: type }, SECRET_2));
}

// Validate the product key
function validate(productKey) {
    return jwt.verify(encryptedSecret.decrypt(productKey), SECRET_2);
}

//Generate keys
let key1 = generate('LoremIpsum');
let key2 = generate('LoremIpsumSitAmet');

console.log(`Key 1: ${key1}`);
console.log(`Key 2: ${key2}`);

//Show validations
console.log('Key 1 validation: ' + JSON.stringify(validate(key1)));
console.log('Key 2 validation: ' + JSON.stringify(validate(key2)));