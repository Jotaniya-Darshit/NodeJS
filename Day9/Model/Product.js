const mongoose = require("mongoose");

const schema = mongoose.Schema({
    PName:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    },
    extracat:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExtraCategorie",
        required: true
    }
});
const firstSchema = mongoose.model("Product-Detail", schema);

module.exports = firstSchema;