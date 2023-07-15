const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("view engine", "ejs");

app.get("/",function(req,res){
    res.render("home");
})
app.get("/getbooks",function(req,res){
    let obj = {
        name:"Satwik"
    }
    res.send(obj);
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("Server running");
})