const mongoose = require("mongoose");
var colors = require('colors');

const connectionDB = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/e-commerce', {
        useNewUrlParser: true,
    }).then(()=>{
        console.log('Database connect successfully !'.yellow.bold);
    }).catch((err)=>{
        console.log(err);
    });;
}

module.exports = connectionDB;
