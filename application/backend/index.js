const path = require("path");
const express = require("express");
const app = express();


//add middlewares
app.use(express.static(path.join(__dirname, "..", "frontend","build")));
app.use(express.static("public"));

app.use((req,res,next) => { 
    res.sendFile(path.join(__dirname, "..", "frontend" , "build", "index.html"));
});

//start express server on port 5000
app.listen(5000, ()=>{
    console.log("server started on port 5000");
});