const exp = require('express');
const port = 2222;

const app = exp();

app.get("/",(req,res)=>{
    res.write("<h1>Hello World.......... <br> Hi... <br> Jotaniya Darshit </h1>");
    res.end();
})

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("Started at : " + port );    
})