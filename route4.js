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
       
        const data = await Employee.find({ age:{$eq:25}}).explain("executionStats")
        // const data = await Employee.find({ name:"madhu"}).explain("executionStats")
        res.status(200).send({data});
    } 
    catch (error) {
        console.error("Error creating index:", error);
        res.status(500).send("Error creating index");
    }
});

Router.get("/removeindexing",async(req,res)=>{
    await Employee.collection.dropIndex({ age: 1 });
    res.status(200).send("Index deleted successfully!");
})

Router.get("/getindexes",async(req,res)=>{
    const data=await Employee.collection.getIndexes()
    res.status(200).send({data:data})
})



module.exports =Router;