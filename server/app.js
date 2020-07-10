const express = require('express');
const app = express();
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8080;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));