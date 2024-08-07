const express = require("express")
require("./db")
const app = express()
const router =require("./route")
const router2 =require("./route2")

app.use(express.json());

// app.use(router)
app.use(router2)




app.listen(3000,()=>{
    console.log("server listening on port no 3000")
})