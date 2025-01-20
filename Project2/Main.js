const express = require('express');
const port = 5173;
const path = require('path');

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use("/CSS", express.static(path.join(__dirname,"CSS")));


let todoList = [
    {id: "1", task: "Buy milk", Desc: "hello", date:"21/01/2025", status: "Incomplete"},
]

app.get("/",(req,res)=>{
    res.render("ToDo",{ todoList });
    res.end();
});

app.post("/addData",(req,res)=>{
    req.body.id = todoList.length + 1;
    todoList.push(req.body);
    res.redirect("/");
})

app.get("/DeleteData",(req,res)=>{
    console.log(req.query)
    let remainingData = todoList.filter((i)=>i.id != req.query.id );
    todoList = remainingData;
    res.redirect("/");
});

app.get("/EditData",(req,res)=>{
    let specificData = todoList.find((i)=>i.id == req.query.id );
    res.render("Edit",{ specificData });
});

app.post("/UpdateData",(req,res)=>{
    todoList.forEach((i)=>{
        if(i.id == req.body.id){
            i.task = req.body.task;
            i.Desc = req.body.Desc;
            i.date = req.body.date;
            i.status = req.body.status;
        }else{
            i
        }
    })
    res.redirect("/");
});

app.listen(port,(err)=>{
    if(err) 
{        console.log(err);
}    else
{        console.log(`Server started on port ${port}`);
}});