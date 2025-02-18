const express = require('express');
const port = 5173;

const app = express();

const mongoose = require('./Config/Database');
const path = require('path');
const cookie = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.static('Public'));
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));
app.use(cookie());
app.use(session({
    name: 'local',
    secret: 'rnw',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 100 * 100 * 60 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./Routes/PageRoute'));

app.listen(port, (err) => {
  err ? console.log(err) : console.log('Server on port : ' + port);
});
