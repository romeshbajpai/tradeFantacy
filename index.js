const express = require("express");
const pool = require('./configs/db')
const bodyparser = require('body-parser')
const userRoutes = require('./routes/user.route')
const gameRoutes = require('./routes/game.route')
const userModel = require('./model/user.model');
const connectDB = require('./configs/mongodb');
// Invoke the connection function
connectDB();
const app = express();
const port = 3000;
//userModel.createUserTable();
//userModel.createUser();
app.use(bodyparser.json())
app.use('/user', userRoutes)
app.use('/game',gameRoutes)
app.listen(port, () => { 
    console.log(`Express Server is running on port : ${port}`);
})
//const pool = require('./configs/db');
