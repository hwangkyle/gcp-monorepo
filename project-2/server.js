const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render(__dirname + "/index");
});

app.listen(8080);