const Router = require("express").Router()
const Employee =require("./db")


// Aggregation in mongodb
// TODO: db.collection.aggregate(pipelie,options)

// ! in aggregate function always passed array because we can pass our result on query to other
// ! The output of one stage is fed as the input to the next stage and so on untill your desired result.

Router.get("/aggregatewithmatch",async(req,res)=>{
    try {
        const data = await Employee.aggregate([{$match:{name:"sonali"}}])
        return res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error.message)

    }
})

// ? The $group operator group documents by the age field and create a new document for each unique age
// ? if you null to _id then its not making group to any field


Router.get("/aggregatewithGroup",async(req,res)=>{
    try {
        const data = await Employee.aggregate([{$group:{_id:"$age"}}])
        return res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error.message)

    }
})

// ** Groups Employee with age and show name of employee

Router.get("/aggregatewithGroup2",async(req,res)=>{
    try {
        const data = await Employee.aggregate([{$group:{_id:"$age",names:{$push:"$name"}}}])
        return res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// ** Group Employee by age and also show complete document per age group



Router.get("/aggregatewithGroup3",async(req,res)=>{
    try {
        const data = await Employee.aggregate([{$group:{_id:"$age",document:{$push:"$$ROOT"}}}])
        return res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// ** Give a count per age of male empolyee

Router.get("/aggregatewithGroup4",async(req,res)=>{
    try {
        const data = await Employee.aggregate(
            [
                {$match:{gender:"male"}},

            {$group:{_id:"$age",number:{$sum:1}}}])
        return res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// ** Give a count per age of male employee and sort them by count in descending manner

Router.get("/aggregatewithGroup5",async(req,res)=>{
    try {
        const data = await Employee.aggregate([{$match:{gender:"male"}},{$group:{_id:"$age",number:{$sum:1}}},{$sort:{number:1}}])
        return res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// ! we can create pipeline as much as we want 

//**  Find Hobbies per age group

Router.get("/aggregatewithGroup6",async(req,res)=>{
    try {
        const data = await Employee.aggregate([{$group:{_id:"$age",hobbies:{$push:"$Hobbies"}}}])
        return res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


Router.get("/aggregatewithGroup7",async(req,res)=>{
    try {
        // const unwinddta = await Employee.aggregate([{$unwind:"$Hobbies"}])
        const data = await Employee.aggregate([{$unwind:"$Hobbies"},{$group:{_id:"$age",hobbies:{$addToSet:"$Hobbies"}}}])
        return res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


// Find number of employee per each Hobbies

Router.get("/aggregatewithGroup8",async(req,res)=>{
    try {
        const data = await Employee.aggregate([{$unwind:"$Hobbies"},
            {$group:{_id:"$Hobbies",count:{$sum:1}}}])

        return res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Find number of employee  average age of all students

Router.get("/aggregatewithGroup9",async(req,res)=>{
    try {
        const data = await Employee.aggregate([
            {$group:{_id:null,averageAge:{$avg:"$age"}}}])
        return res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


// find total number of Hobbies for all the students in a collection


Router.get("/aggregatewithGroup10",async(req,res)=>{
    try {
        // const data = await Employee.aggregate([
            // {$group:{_id:null,count:{$sum:{$size:"$Hobbies"}}}}])

            const newdata = await Employee.aggregate([
                {
                  $group: {
                    _id: null,
                    count: {
                      $sum: {
                        $size: {
                          $ifNull: ["$Hobbies", ["bolyball","garba"]]
                        }
                      }
                    }
                  }
                }
              ])
              

        return res.status(200).send(newdata)
    } catch (error) {
        res.status(500).send(error.message)
    }
})






















module.exports =Router;