const express = require('express');
const  StudentRouter = require("./Routes/StudentRouter");
const app = express();
require("dotenv").config();
require("./Model/dbConnect");

app.use('/api/student', StudentRouter);
app.listen(process.env.port || 4000, function(){console.log('Now listening for requests on: http://localhost:4000');
});