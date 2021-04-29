//Dependencies
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const helmet = require("helmet");
const Filter = require("bad-words");

//Instantiate filter
const filter = new Filter();

const app = express();
const port = 7500;

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Helmet middleware
app.use(helmet.hidePoweredBy());

//Cors middleware
app.use(cors());

app.post('/filter', function (req, res) {
    const { text } = req.body;
    const words = require("./dictionary/badwords.json");
    filter.addWords(...words);
    filter.removeWords('hells', 'hell','sadist');
    res.send(
        {
            original: text,
            transformed: filter.clean(text)
        }
    )
});

//start server
const server = http.createServer(app);
server.listen(port);

//Log output of server running
console.log(`Server running at port ${port}`);