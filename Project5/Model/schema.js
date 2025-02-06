const mongoose = require("mongoose");

const Movie = mongoose.Schema({
    img : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    Desc : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    releaseDate : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true
    }
});

const Schema = mongoose.model("MovieData",Movie);

module.exports = Schema;