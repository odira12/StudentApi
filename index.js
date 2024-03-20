const express = require("express");
const app = express();
const studentRoute = require("./Routes/StudentRouter");
const courseRoute =require("./Routes/CourseRouter");
const regRoute = require("./Routes/regRouter");
const createError = require("http-errors");


require("dotenv").config();
require("./model/dbConnect");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/student", studentRoute);
app.use("/api/course", courseRoute);
app.use("/api/reg",regRoute);


// Handling 404 error
app.use(async(res, next) =>{
    next(createError.NotFound())
});

// Error handling midlleware
app.use((error, req, res,next) =>{
    if (error.status === 401){
        // Handling 401 Unauthorized error
        res.status(401).send({
            error:{
                status: 401,
                massege: "Unauthorized: Invalid username/password"
            }
        });
    } else{
        // Handling other errors
        res.status(err.status|| 500).send({
            error:{
                status: err.status || 500,
                message:error.message|| "Internal Server Error"
            }
        });
    }
});

// Not Found middleware
app.use(async(req, res, next) =>{
    next(createError.NotFound());
});


app.listen(process.env.port || 4000, function() {
    console.log("Now listening for requests on: http://localhost:4000");
});