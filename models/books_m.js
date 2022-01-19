const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const author=require('./author_m');
// var books=[
//     {name:"Book1",genre:"Thriller",id:"1",author:"3"},
//     {name:"Book2",genre:"Romance",id:"2",author:"1"},
//     {name:"Book3",genre:"Romance",id:"3",author:"2"},
//     {name:"Book4",genre:"Romance",id:"4",author:"1"},
//     {name:"Book5",genre:"Romance",id:"5",author:"2"},
//     {name:"Book6",genre:"Comedy",id:"6",author:"2"}
// ]

const Book = new Schema({
  name: {
    type: String ,
    required: true
  }, 
  genre: {
    type: String ,
    required: true
  }, 
  author: {
    type: mongoose.Types.ObjectId ,
    ref:'author',
    required: true
  }, 
});

module.exports = mongoose.model("book", Book);