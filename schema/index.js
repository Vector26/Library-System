const graphql = require("graphql");
const { GraphQLObjectType}= graphql;
const _ = require('lodash'); 
const Book=require('../models/books_m');
const author=require('../models/author_m');


const AuthorMutationSchema={
    id:{type:graphql.GraphQLID},
    name:{type:graphql.GraphQLString},
    age:{type:graphql.GraphQLInt}
};

const BookMutationSchema={
    id:{type:graphql.GraphQLID},
    name:{type:graphql.GraphQLString},
    genre:{type:graphql.GraphQLString},
    author:{type:graphql.GraphQLID}
}


const BookType= new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:graphql.GraphQLID},
        name:{type:graphql.GraphQLString},
        genre:{type:graphql.GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                const authorId=parent.author;
                return author.findOne({_id:authorId}).exec();
            }
        }
    })
});

const AuthorType= new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:graphql.GraphQLID},
        name:{type:graphql.GraphQLString},
        age:{type:graphql.GraphQLInt},
        book:{
            type:new graphql.GraphQLList(BookType),
            resolve(parent,args){
                // console.log(parent);
                return Book.find({author:parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{ id:{type:graphql.GraphQLString}},
            resolve(parent,args,context){
                // console.log(context.headers);
                return Book.findOne({id:args.id})
            }
        },
        books:{
            type:new graphql.GraphQLList(BookType),
            args:{ id:{type:graphql.GraphQLString}},
            resolve(parent,args){
                return Book.find({})
            }
        },
        author:{
            type:AuthorType,
            args:{ id:{type:graphql.GraphQLID}},
            resolve(parent,args){
                return author.findOne({_id:args.id})
            }
        }
    }
})

const Mutations= new GraphQLObjectType({
    name:"Mutation",
    fields:{
        createAuthor:{
            type:AuthorType,
            args:AuthorMutationSchema,
            resolve(parent,args){
                delete args['id'];
                console.log(args);
                const auth=author.create(args);
                return auth;
            }
        },
        updateAuthor:{
            type:AuthorType,
            args:AuthorMutationSchema,
            async resolve(parent,args){
                await author.updateOne({_id:args.id},args).exec();
                // author.create(args);
                const auth=await author.findOne({_id:args.id}).exec();
                // console.log(auth);
                return auth;
            }
        },
        deleteAuthor:{
            type:AuthorType,
            args:AuthorMutationSchema,
            async resolve(parent,args){
                console.log(args);
                // const auth=await author.findOne({args}).exec();
                const delAuth= await author.deleteOne({args}).exec();
                // console.log(auth);
                console.log(delAuth);
                if(delAuth.deletedCount>0)
                    return {id:"DELETED"};
                else
                    return {id:"Error In Deletion"}
            }
        },
        createBook:{
            type:BookType,
            args:BookMutationSchema,
            resolve(parent,args){
                delete args['id'];
                console.log(args);
                const book=Book.create(args);
                return book;
            }
        },
        updateBook:{
            type:BookType,
            args:BookMutationSchema,
            async resolve(parent,args){
                await Book.updateOne({_id:args.id},args).exec();
                // author.create(args);
                const book=await Book.findOne({_id:args.id}).exec();
                // console.log(auth);
                return book;
            }
        },
        deleteBook:{
            type:BookType,
            args:BookMutationSchema,
            async resolve(parent,args){
                console.log(args);
                const delBook= await Book.deleteMany(args).exec();
                console.log(delBook);
                if(delBook.deletedCount>0)
                    return {id:"DELETED"};
                else
                    return {id:"Error In Deletion"}
            }
        },
    }
});

module.exports = new graphql.GraphQLSchema({
    query:RootQuery,
    mutation:Mutations
})