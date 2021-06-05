const express = require('express');
const multer = require("multer");
const path = require("path");

const checkAuth = require('../middleware/check-auth');

const Project = require('../models/project'); 

// multer configuration to handle file uploads to server
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'imagejpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cback)=>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid Mime Type");

    if(isValid){
      error = null;
    }
    cback(error, "backend/images/projects"); // destination folder
  },
  filename: (req, file, cback)=>{
    const fileName = path.parse(file.originalname.toLowerCase().split(' ').join('-')).name;
    const ext = MIME_TYPE_MAP[file.mimetype];

    cback(null, fileName + "-" + Date.now() + "." + ext);
  }

  });

const router = express.Router();


router.post("/create", checkAuth, multer({storage: storage}).single("image") ,(req, res) => {
  const url = req.protocol + "://" + req.get("host"); // server url
  const project = new Project({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(req.body.date),
    imagePath: url + "/images/projects" + req.file.filename,
    githubLink: req.body.githubLink,
    youtubeLink: req.body.youtubeLink,
    claps: 0
  });

  project.save()
  .then(createdProject =>{
    req.visitor.pageview(req.baseUrl + req.path).send();
    
    res.status(201).json({
      mesaage: "project created successfully",
      project: {
        ...createdProject,
        id: createdProject._id 

      }
    });
  })
  .catch(err =>{
    res.status(401).json({
      message: "Failed to create new project"
    });
  });
});


router.get("",(req, res, next) => {
  req.visitor.pageview(req.baseUrl + req.path).send();
  
  //pagination query
  const pageSize = +req.query.pagesize;  
  const currentPage = +req.query.page;
  const projectQuery = Project.find();
  let fetchedProjects;

  if(pageSize && currentPage){
    projectQuery
    .skip( pageSize * (currentPage - 1))
    .limit(pageSize);
  }


  // static mongoose method to getting the documents in collection projects
  projectQuery.then( documents => {
    fetchedProjects = documents;
    return Project.countDocuments();
  })
  .then(count =>{
    res.status(200).json({
      message: 'Succesfully sent from api',
      body: fetchedProjects,
      maxProjects: count
    });
  });

});


router.get("/:id", (req, res, next) =>{
  
  Project.findById(req.params.id).then(project =>{
    if(project){
      req.visitor.pageview(req.baseUrl + req.path + req.params.id).send();
      res.status(200).json(project);

    }
    else{
      res.status(404).json({
        message: "Project not found"
      })
    }
  });
})


router.put("/update/:id", checkAuth, multer({storage: storage}).single("image"), (req, res, next) =>{

  const url = req.protocol + "://" + req.get("host"); // server url
  
  updateData = req.body;
  updateData.id = req.params.id;

  if(req.body.date){
    updateData.date = new Date(req.body.date);
  }
  if(req.file){
    updateData.imagePath = url + "/images/projects/" + req.file.filename;
  }

  Project.updateOne({_id: req.params.id}, {$set:updateData})
  .then(result => {
    req.visitor.pageview(req.baseUrl + req.path + req.params.id).send();
    res.status(200).json({ message: 'Update successful'})
  });
});


router.delete("/:id", checkAuth, (req, res, next) => {

  Project.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
    req.visitor.pageview(req.baseUrl + req.path + req.params.id).send();
    res.status(200).json({
      message: 'document deleted'
    });
  });

});

module.exports = router;