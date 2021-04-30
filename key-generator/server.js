//Dependencies
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const encrypter = require("cryptr");
require('dotenv').config();

const app = express();
const port = 7800;

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet.hidePoweredBy());
app.use(cors());

app.post('/generate', function (req, res) {
    const { text } = req.body;

    // Secrets
    const { SECRET_1, SECRET_2 } = process.env;

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
    let key = generate(text);

    res.send(
        {
            original: text,
            license: key,
            validation: JSON.stringify(validate(key))
        }
    )
});

//start server
const server = http.createServer(app);
server.listen(port);

//Log output of server running
console.log(`Server running at port ${port}`);