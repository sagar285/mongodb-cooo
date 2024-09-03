const Router = require("express").Router()
const Employee =require("./db")

Router.post("/employee",async(req,res)=>{
   const data = req.body;
   const newdata = await Employee.create(data)
   res.send(newdata);
})


//** */ questions which need to answer in this video

// TODO: employee who experience in google --

// TODO: HOW MANY EMPLOYEE WORKED IN SPOTIFY --

// TODO: HOW MANY EMPLOYEE WHO WORKED IN THREE COMPANY ---


// TODO:HOW MANY EMPLOYEE WHO WORKED IN GREATER THAN or equal 3 COMPANY --


// TODO: HOW MANY EMPLOYEE WHOSE HOBBIES ARE SINGING AND DANCING --


// TODO: DOCUMENTS THAT  HAVE AT LEAST AN EMPLOYEE WHO WORKS IN GOOGLE WITH 3 YEAR duration


Router.get("/employee",async(req,res)=>{
    const data = await Employee.find({Hobbies:"singing"})
    res.send(exprdata);
})





Router.get("/empexper",async(req,res)=>{
    const data = await Employee.find({"experience.company":"google"})
    res.send(data);
})






Router.get("/emplycount",async(req,res)=>{
    const data = await Employee.find({"experience.company":"Spotify"}).countDocuments()
    res.status(200).send({data:data});
})





Router.get("/employeethreecompany",async(req,res)=>{

    const data = await Employee.find({experience:{$size:3}})
    res.status(200).send({data:data})
})


Router.get("/employeeMorethanthreecompany",async(req,res)=>{
    // const data = await Employee.find({experience:{$size:{$gte:3}}})
    const data = await Employee.find({$expr:{$gte:[{$size:"$experience"},2]}})
    res.status(200).send({data:data})
})



Router.get("/employeeHobiees",async(req,res)=>{
    const data = await Employee.find({Hobbies:{$in:["dancing","singing"]}})
    res.send(data)
})


Router.get("/employeegooglethreeyearexper",async(req,res)=>{

    // const data = await Employee.find({$and:[{"experience.company":"google"},{"experience.duration":3}]})

    const conrrectdata = await Employee.find({experience:{$elemMatch:{duration:{$gte:3},company:"google"}}})
    res.send(conrrectdata)
})



module.exports =Router;
