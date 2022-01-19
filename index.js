const express=require('express');
const app=express();
const graphqlHTTP = require('express-graphql');
const mongoose = require("mongoose");
// var { buildSchema } = require('graphql')
const schema=require('./schema/index');

const port = process.env.PORT || 5000;
mongoose.connect('mongodb://localhost/GQL').then(()=>{
    console.log("connected DB");
});
app.use('/',graphqlHTTP.graphqlHTTP({
    schema:schema,
    graphiql:true
}));

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
