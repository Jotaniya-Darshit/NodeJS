const mongoose = require("mongoose");

const schema = mongoose.Schema({
    subcatName:{
        type : String,
        required : true
    },
    categoryId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Categorie",
        required : true
    }
})

const firstSchema = mongoose.model("SubCategorie",schema);

module.exports = firstSchema;