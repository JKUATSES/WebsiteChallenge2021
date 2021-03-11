//7p0EOoNMoZ4SL8wS
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const mongoose = require('mongoose');


const userRoutes = require('./routes/user');
const aboutRoutes = require('./routes/user');
const archiveRoutes = require('./routes/user');
const blogRoutes = require('./routes/user');
const eventsRoutes = require('./routes/user');
const galleryRoutes = require('./routes/user');
const partnersRoutes = require('./routes/user');
const servicesRoutes = require('./routes/user');
const teamRoutes = require('./routes/user');

const app = express();



mongoose.connect("mongodb+srv://smith:P0azDgKsVzVUUbY5@cluster0.ptmmu.mongodb.net/node-angular?retryWrites=true&w=majority", {useNewUrlParser: true,  useUnifiedTopology: true } )
.then( () =>{
  console.log("Connected to Database");
})
.catch(()=>{
  console.log('Connection failed');
});

//app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//granting access to the images folder
app.use("/images", express.static(path.join("backend/images")));

//set headers to disablle CORS error that is triggered bb default
//CORS - Cross Origin Resource Error

app.use((req, res, next) => {

  //Allows domains to access resources
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT");

  //Restrict to domains sending request with a set of particular headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
});

// app.use("/api/user", userRoutes);


module.exports = app;
