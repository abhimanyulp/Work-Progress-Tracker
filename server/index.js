const express = require("express")
const cors = require("cors")
require("dotenv").config()
const app = express()
const connection = require("./config/db")

app.use(express.json())
app.use(cors())

// app.use("/", route)

app.listen(async ()=> {
    try {
        await connection
    } catch (error) {
        console.log("Error connecting to DB")
        console.log(error)
    }
    console.log(`Connected to db @ port ${process.env.port}`)
})