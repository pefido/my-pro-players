const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();
const port = 3000;
const db = require('./db/db');
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport, db);
require('./routes/routes')(app, db);
const serverUtilities = new (require('./controllers/serverUtilities'))(db);

app.listen(port, () => console.log("listening at port " + port));