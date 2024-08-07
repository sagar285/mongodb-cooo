const Router = require("express").Router()
const Employee =require("./db")


//* mongodb operator

// TODO: $inc , $min , $max , $mul , $unset , $rename ,upsert



Router.get("/incoperator",async(req,res)=>{
    const data = await Employee.findOneAndUpdate({name:"sagar"},{$inc:{age:-2}},{new:true})
    res.send({data:data});
})




Router.get("/maxandmin",async(req,res)=>{
    const data = await Employee.findOneAndUpdate({name:"sagar"},{$min:{age:2}},{new:true})
    res.send({data:data});
})


Router.get("/mul",async(req,res)=>{
    const data = await Employee.findOneAndUpdate({name:"sagar"},{$mul:{age:2}},{new:true})
    res.send({data:data});
})


Router.get("/unset",async(req,res)=>{
    const data = await Employee.findOneAndUpdate({name:"sagar"},{$unset:{age:22}},{new:true})
    res.send({data:data});
})


Router.get("/rename",async(req,res)=>{
    const data = await Employee.findOneAndUpdate({name:"sagar"},{$rename: { newage : "age" }},{new:true});
    res.send({data:data});
})

Router.get("/upsert",async(req,res)=>{
    const data = await Employee.findOneAndUpdate({name:"rahuldubey"},{$set:{age:20}},{upsert:true})
    res.send({data:data});
})




module.exports =Router;