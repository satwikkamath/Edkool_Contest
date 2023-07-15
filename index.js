const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const https = require('https');
const ejs = require('ejs');

const app = express();
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("view engine", "ejs");

app.get("/",function(req,res){
    res.render("home");
})
app.post("/getBooks",function(req,res){
    const bookName = req.body.title;
    const url = "https://www.googleapis.com/books/v1/volumes?q="+bookName+"&projection=lite&key=AIzaSyDP2Az4y5Y4M6euPYH3u1YERY7eOqUMpJ8&startIndex=0&maxResults=27";
    
    

    https.get(url,function(response){
        let data = '';

        response.on('data', chunk => {
            data += chunk;
        });

        response.on("end",function(){
            const bookList = JSON.parse(data)
                res.json(bookList);
        })
    })

    

})


const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("Server running");
})