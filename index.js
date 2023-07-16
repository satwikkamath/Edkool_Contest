const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const https = require('https');
const ejs = require('ejs');

mongoose.connect("mongodb+srv://satwikroopa:Roopa70263@fruitdb.8sxipgz.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true });


const bookUserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phoneNumber: Number,
})

const listSchema = new mongoose.Schema({
    email: String,
    bookName: String,
    subName: String,
    author: String,
    readurl: String,
    imgurl: String
})
const BookUser = mongoose.model("bookUser", bookUserSchema);
const List = mongoose.model("bookList", listSchema);
const app = express();
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("home");
})

app.get("/loginFromMain", function (req, res) {
    res.render("login", { text: false, passwordFail: false, notFound: false });
})

app.get("/signupFromMain", function (req, res) {
    res.render("signup", { error: false });
})



app.post("/userSignUp", function (req, res) {
    const receivedName = req.body.name;

    const receivedEmail = req.body.email;

    const receivedPhno = req.body.phno;

    const receivedPswd = req.body.password;
    const cpswd = req.body.cpassword;
    if (receivedPswd != cpswd) {
        res.render("signup", { error: true });  // if password and confirm password wont match
    }
    else {
        BookUser.findOne({ email: receivedEmail }).then(function (data) {
            if (data) {
                res.render("userLogin", { text: "Account already exists with this Email", passwordFail: false, notFound: false });     // if an account already exists while signing up
            }
            else {
                const user = new BookUser({
                    name: receivedName,
                    email: receivedEmail,                // if no account exists, new account is created 
                    password: receivedPswd,
                    phoneNumber: receivedPhno
                })
                user.save();
                res.render("login", { text: "Your account was succesfully created", passwordFail: false, notFound: false });
            }
        })
    }
})
let userMainName,userMainEmail
app.post("/userLogin", function (req, res) {
    userMainEmail = req.body.email;
    const pswd = req.body.password;

    BookUser.findOne({ email: userMainEmail }).then(function (user) {
        if (user) {
            userMainName = user.name;
            if (pswd === user.password) {
                res.render("user", { userName: user.name, userEmail: user.email });  // if password matched
            }
            else {
                res.render("login", { passwordFail: true, text: false, notFound: false });  // if password not matched
            }
        }
        else {
            res.render("login", { passwordFail: false, text: false, notFound: true });  // if password not matched
        }
    }).catch(function (err) {
        res.send(err);
    })
})
app.post("/getBooks", function (req, res) {
    const bookName = req.body.title;
    const url = "https://www.googleapis.com/books/v1/volumes?q=" + bookName + "&filter=free-ebooks&projection=lite&key=AIzaSyDP2Az4y5Y4M6euPYH3u1YERY7eOqUMpJ8&startIndex=0&maxResults=27";

    https.get(url, function (response) {
        let data = '';

        response.on('data', chunk => {
            data += chunk;
        });

        response.on("end", function () {
            const bookList = JSON.parse(data)
            res.json(bookList);
        })
    })
})

app.post("/userList", function (req, res) {
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    
    setTimeout(function(){
        List.find({email:userEmail}).then(function(data){

            res.render("userList",{data:data,userName:userName,userEmail:userEmail});
        })
    },1000)
    
})

app.post("/addToList", function (req, res) {
    const userName = userMainName;
    const email = userMainEmail;
    const name = req.body.bookName;
    const subName = req.body.subName;
    const imgurl = req.body.imgurl;
    const readurl = req.body.readurl;
    const author = req.body.author;

    const list = new List({
        email: email,
        bookName: name,
        subName: subName,
        author: author,
        readurl: readurl,
        imgurl: imgurl
    })
    list.save();

    setTimeout(function(){
        List.find({email:email}).then(function(data){
            // console.log(data);
            res.render("userList",{data:data,userName:userName,userEmail:email});
        })
    },1000)
})

app.post("/removeFromList",function(req,res){
    const userEmail = req.body.userEmail;
    const bookName = req.body.bookName;
    console.log(userEmail);
    console.log(bookName);
    List.deleteOne({email:userEmail,bookName:bookName}).then(function(data){
        console.log(data);
    })

    setTimeout(function(){
        List.find({email:userEmail}).then(function(data){
                res.render("userList",{userName:userMainName,userEmail:userEmail,data:data});
        })
    },1000)
})

app.get("/userPageFromUserList",function(req,res){
    res.render("user",{userName:userMainName, userEmail:userMainEmail})
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("Server running");
})