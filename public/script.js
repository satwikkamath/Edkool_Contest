// const axios = require('axios');

async function getBookData() {
    let a;
    const response = await fetch("/getbooks");
    const data = await response.json();
    a = data.name;
    return a;
  }
let b;
document.getElementById("btn").addEventListener('click',function(){
    getBookData().then(function(res){
        b= res;
    })
    
})