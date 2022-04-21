const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const path = require('path')
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
dotenv.config();
 
const __myPath = path.resolve();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
})
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((e) => console.log(e));

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

// Serve static files from the React frontend app
//app.use(express.static(path.join(__dirname, '../frontend/build')))
app.use(express.static(path.join(__myPath, "/frontend/build")));

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
  //res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
  res.sendFile(path.resolve(__myPath, "frontend", "build", "index.html"))
})

app.listen(8080,()=>{
    console.log("Backend Running")
})