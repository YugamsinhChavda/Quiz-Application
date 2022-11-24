const express = require('express');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbconfig');
const PORT = process.env.PORT || 5000;
const cors = require('cors');


const userRoute = require('../backend/routes/userRoutes');
const examRoute = require('../backend/routes/examRoutes');
const reportRoute = require('../backend/routes/reportRoutes');

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.use(cors());

app.use(express.json());
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS, PUT");
//     next();
//   })



app.use("/api/users",userRoute);
app.use("/api/exams",examRoute);
app.use("/api/reports",reportRoute);

const path = require("path");
__dirname = path.resolve();

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "frontend/build")));
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    })
}