const mongoose = require("mongoose")
let LoginData = mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})

let admin = mongoose.model("userData",LoginData)
module.exports = admin