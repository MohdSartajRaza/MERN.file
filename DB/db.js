const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/DBAug')

const db = mongoose.connection;

db.on('error',function(){
    console.log("error is connection with mongo db")
})
 

db.once('open',function(){
    console.log("successfully connected with Mongo-DB")
})
 
module.exports=db;