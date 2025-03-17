const mongoose = require("mongoose");

const SetImg = mongoose.Schema({
    fname : {
        type : String,
        required : true
    },
    lname : {
        type : String,
        required : true
    },
    city : {
        type : String,
        requried : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    hobby : {
        type : String,
        required : true
    },
    img : {
        type : String,
        required : true
    }
});

const Schema = mongoose.model("AllAdmin",SetImg);

module.exports = Schema;