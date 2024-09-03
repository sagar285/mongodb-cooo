const express = require("express")
require("./db")
const app = express()
const router =require("./route")
// const router2 =require("./route2")
const router3 =require("./route3")
const router4 =require("./route4")
const router5 =require("./route5")

app.use(express.json());

app.use(router)
app.use(router3)
app.use(router4)
app.use(router5)




app.listen(3000,()=>{
    console.log("server listening on port no 3000")
})