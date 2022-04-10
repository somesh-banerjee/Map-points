const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
 
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
    })
    .then(()=>{
        console.log("MongoDB Connected");
    })
    .catch((e) => console.log(e));

app.listen(8080,()=>{
    console.log("Backend Running")
})