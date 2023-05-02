const mongoose = require("mongoose");
const connectionDB = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/netflix', {
        useNewUrlParser: true,
    }).then(()=>{
        console.log('Database connect successfully !');
    }).catch((err)=>{
        console.log(err);
    });;
}

module.exports = connectionDB;
