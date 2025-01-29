const mongoose = require('mongoose');

const schema = mongoose.Schema({
    img : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    author : {
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
    soldCopy : {
        type : Number,
        required : true
    }
});

const FS = mongoose.model("BookDetail",schema);

module.exports = FS;