const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// var authors=[
//     {name:"Author1",age:45,id:"1"},
//     {name:"Author2",age:50,id:"2"},
//     {name:"Author3",age:32,id:"3"},
// ]

const author = new Schema({
 name : {
    type:String ,
    required: true
  }, 
 age : {
    type:Number ,
    required: true
  } 
});

module.exports = mongoose.model("author", author);