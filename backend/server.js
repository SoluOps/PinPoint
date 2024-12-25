const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express(); 
const pointsRoute = require("./routes/points");
const usersRoute = require("./routes/users");


// For use of json file
app.use(express.json()); 

// http link to points part in backend for API requests

app.use("/api/points/", pointsRoute);
app.use("/api/users/", usersRoute);

// backend server connection 

app.listen(process.env.PORT, () => {
    console.log("Backend server to lift off!")
});

// database connection

mongoose.connect(process.env.MONGODB_URI) 
.then(() => {
    console.log("MongoDB is connected!")
})
.catch((error)=> {
    console.log(error)
});


// check website connection 

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
//   });




