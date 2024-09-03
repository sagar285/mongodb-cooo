const mongoose = require("mongoose")


mongoose.connect("mongodb://127.0.0.1:27017/Mongodbcourse").then(()=>{
    console.log("connection succesfull")
}).catch((e)=>{
    console.log(e)
})


const EmployeSchema = new mongoose.Schema({
    name:String,
    gender:String,
    age:Number,
    Hobbies:Array,
    identity:Object,
    bio:String,
    experience:Array,
})

module.exports = mongoose.model("Employeee",EmployeSchema);