const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const db = require('./db/db');
app.use(express.json());
require('./routes/routes')(app, db);

app.listen(port, () => console.log("listening at port " + port));