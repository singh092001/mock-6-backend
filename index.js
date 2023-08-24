const express = require('express');
var cors = require('cors');
const connectToServer = require('./config/config');
const userRoute = require('./route/userRoute');
const blogRoute = require('./route/blogRoute');

const app = express()

app.use(cors())

app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Welcome To My Backend Server For Mock-6 Revision")
})

app.use("/api", userRoute)

app.use("/api/blogs", blogRoute)

app.listen(8080, connectToServer())