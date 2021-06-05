//7p0EOoNMoZ4SL8wS
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const session = require('express-session');
const cookieParser = require('cookie-parser');

const ua = require('universal-analytics');

const mongoose = require('mongoose');


const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');
const membersRoutes = require('./routes/members');
const testimonialsRoutes = require('./routes/testimonials');
const projectsRoutes = require('./routes/projects');
const galleryRoutes = require('./routes/gallery');
const eventsRoutes = require('./routes/events');
const aboutRoutes = require('./routes/about');
const archiveRoutes = require('./routes/archives');
 

const app = express();

// app.use(cookieParser());
// app.use(session({secret: "keep this hidden"}));




mongoose.connect("mongodb+srv://smith:" + process.env.MONGO_ATLAS_PW + "@cluster0.ptmmu.mongodb.net/SESWebChallenge?retryWrites=true&w=majority", {useNewUrlParser: true,  useUnifiedTopology: true } )
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


app.use(ua.middleware("UA-193746825-1", {cookieName: '_ga'}));

app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/team", membersRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/archives", archiveRoutes);



module.exports = app;
