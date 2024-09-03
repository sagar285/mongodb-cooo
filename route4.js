const Router = require("express").Router()
const Employee =require("./db")

// Indexing in mongodb
// colscan -normal search
// ixscan - 



Router.get("/indexing", async (req, res) => {
    try {
        await Employee.collection.createIndex({ age: 1 });
        // console.log(await Employee.find({ age:{$gte:12}}).explain("executionStats"));
        res.status(200).send("Index created successfully!");
    } 
    catch (error) {
        console.error("Error creating index:", error);
        res.status(500).send("Error creating index");
    }
});
Router.get("/indexingstats", async (req, res) => {
    try {
        const data = await Employee.find({ age:{$eq:24}}).explain("executionStats")
        // const data = await Employee.find({ name:"madhu"}).explain("executionStats")
        res.status(200).send({data});
    } 
    catch (error) {
        console.error("Error creating index:", error);
        res.status(500).send("Error creating index");
    }
});

Router.get("/removeindexing",async(req,res)=>{
    await Employee.collection.dropIndex({ age: 1,name:1});
    res.status(200).send("Index deleted successfully!");
})

Router.get("/getindexes",async(req,res)=>{
    const data=await Employee.collection.getIndexes()
    res.status(200).send({data:data})
})


// part 2
// Types of Indexing 
//   1.Single Fields Indexing
//   2.Compound Indexes (order matters)
//   3.Text Indexes 

// Bonus: 
//     Partially Filter Indexing
//     Covered Query

// ** When not to use indexing

// *1. When The collection is small

// *2. When the collection is frequently updated

// *3. when the queries from multiple fields 

// *4. When collection large make less indexes


Router.get("/Compoundindexing", async (req, res) => {
    try {
        await Employee.collection.createIndex({ "age": 1,"name":1 });
        // console.log(await Employee.find({ age:{$gte:12}}).explain("executionStats"));
        res.status(200).send("Index created successfully!");
    } 
    catch (error) {
        console.error("Error creating index:", error);
        res.status(500).send("Error creating index");
    }
});

Router.get("/ordermatters",async(req,res)=>{
    // const data=await Employee.find({age:{$gte:25}}).explain("executionStats")
    // const data=await Employee.find({age:{$gte:25},name:"madhu"}).explain("executionStats")
    // const data=await Employee.find({name:"madhu",age:{$gte:25}}).explain("executionStats")
    const data=await Employee.find({age:{$gte:25}})
    res.status(200).send({data:data})
})



Router.get("/partialfilterindexing",async(req,res)=>{
    try {
    const data = await Employee.collection.createIndex({age:1},{partialFilterExpression:{age:{$lt:25}}})
    res.status(200).send("Index created successfully!");
} 
catch (error) {
    console.error("Error creating index:", error);
    res.status(500).send("Error creating index");
} 
})

Router.get("/coverredquery",async(req,res)=>{
    const data=await Employee.find({age:24}).explain("executionStats")
    res.status(200).send({data:data})
})


// TODO:PART 3 -
// * Winning plan in mongodb
//*  what is multi key indexing
// * Text Indexing (one on per collection)


// *************************************

// ***** winning plan calculation*****

// ** 1. mongodb check performance of index on a sample
// **    of documents once the queries run and set it as winning place.
// **   it store that winning plan in cache

// TODO: when cache of winning plan reset
//  **   After 1000 writes operation
// **  Index is reset
// **  Mongo server is restarted 
//**   other indexes are manipulated or updated


// TODO:MULTI KEY INDEX

// ** multi key index that can be created on an array field

Router.get("/multipleindexing", async (req, res) => {
    try {
        await Employee.collection.createIndex({ age: 1 });
        await Employee.collection.createIndex({ "age": 1, "name":1 });
        // console.log(await Employee.find({ age:{$gte:12}}).explain("executionStats"));
        res.status(200).send("Index created successfully!");
    } 
    catch (error) {
        console.error("Error creating index:", error);
        res.status(500).send("Error creating index");
    }
});

Router.get("/winningplan",async(req,res)=>{
    const data=await Employee.find({age:24,name:"madhu"}).explain("executionStats")
    res.status(200).send({data:data})
})



Router.get("/multiKeyIndex",async(req,res)=>{
    try {
        await Employee.collection.createIndex({ Hobbies: 1 });
        res.status(200).send("Index created successfully!");
    } 
    catch (error) {
        console.error("Error creating index:", error);
        res.status(500).send("Error creating index");
    }
})

Router.get("/arrayindexing",async(req,res)=>{
    const data=await Employee.find({Hobbies:"signing"}).explain("executionStats")
    res.status(200).send({data:data})
})

Router.get("/TextIndexing",async(req,res)=>{
    try {
        await Employee.collection.createIndex({bio:"text" });
        res.status(200).send("Index created successfully!");
    } 
    catch (error) {
        console.error("Error creating index:", error);
        res.status(500).send("Error creating index");
    }
})

Router.get("/searchtextindexing",async(req,res)=>{
    const data = await Employee.find({$text:{$search:"yotuber"}})
    res.status(200).send({data:data})
})











module.exports =Router;