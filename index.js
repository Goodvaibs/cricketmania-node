const express = require('express');
const Mongoose = require('mongoose');
const BodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();


//import routes
const playerRotues = require('./Routes/player');
const teamRotues = require('./Routes/team');
const newsRotues = require('./Routes/news');
const subHeaderRotues = require('./Routes/subheader');

//package Middleware
app.use(cors());
app.use(BodyParser.json());

//route middlewares
app.use('/player', playerRotues);
app.use('/team', teamRotues);
app.use('/news', newsRotues);
app.use('/subHeader', subHeaderRotues);

//Middleware
// app.use('/', (req, res, next) => {
//     console.log("this is a middleware")
// });

//Routes
// app.get('/', (req, res) => {
//     res.send("we are at home");
// });


//DB
Mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => {
        console.log("connected to db");
})

//server connection
app.listen(3000, () => {
    console.log('App listening on port 3000!');
});