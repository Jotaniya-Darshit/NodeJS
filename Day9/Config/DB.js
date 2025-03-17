const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/AdminPanel");

const DB = mongoose.connection;

DB.once("open",(err) => {
    err ? console.log(err) : console.log("Connected to Database");
});

module.exports = DB;