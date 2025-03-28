const mongoose = require("mongoose");

const schema = mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        require:true,
    },
    gender:{
        type:String,
        require:true,
    },
    role:{
        type:String,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
})


const AdminSchema = mongoose.model("Admin",schema);

module.exports = AdminSchema;