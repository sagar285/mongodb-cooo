const Router = require("express").Router()
const Employee =require("./db")


// TODO: Q1. For all employee lesser than and equal to 2 year for all employee add a new field notSelected:true

// TODO: Array update has three ways

// TODO: 1. First element of array update which match your condition

// TODO: 2. All element update of array

// TODO:3. Only Matching elements of Array should update


// TODO: $POP, $PUSH ,$ADDTOSET ,$PULL

Router.get("/updatenestedarray",async(req,res)=>{

    const data = await Employee.find({experience:{$elemMatch:{duration :{$lte:2}}}})

    // const updatedarrayvalue = await Employee.findOneAndUpdate({experience:{$elemMatch:{duration:{$lte:2}}}},{$set:{"experience.$":{notSelected:true}}},{new:true})

    // const addvaluetoarrayvalue = await Employee.updateMany({experience:{$elemMatch:{duration:{$lte:2}}}},{$set:{"experience.$.notSelected":true}})

    // const allelementsofarray = await Employee.updateMany({experience:{$elemMatch:{duration:{$lte:1}}}},{$set:{"experience.$[].simplyjscoding":true}})

    const onlymatchedvalues = await Employee.updateMany({experience:{$elemMatch:{duration:{$lte:1}}}},{$set:{"experience.$[e].mynewchannelannoucment":true}},{arrayFilters:[{"e.duration":{$lte:2}}]})
    res.send(data) 
})

Router.get("/push",async(req,res)=>{
    const data = await Employee.findOneAndUpdate({name:"aman"},{$push:{experience:{company:"webmobril",duration:2}}},{new:true})
    res.send(data)
})

Router.get("/addToset",async(req,res)=>{
    const data = await Employee.findOneAndUpdate({name:"aman"},{$addToSet:
        {experience:{company:"webmbril",duration:2}}})
        res.send(data)   
})


Router.get("/pull",async(req,res)=>{
    const data =await Employee.findOneAndUpdate({name:"aman"},{$pull:{experience:{company:"webmobril"}}},{new:true})
    res.send(data)
})

Router.get("/pop",async(req,res)=>{
    const data = await Employee.findOneAndUpdate({name:"aman"},{$pop:{experience:1}},{new:true})
    res.send(data)
})





module.exports =Router;