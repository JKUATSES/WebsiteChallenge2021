const express = require('express');
const multer = require("multer");
const path = require("path");

const Service = require('../models/service'); 

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
    cback(error, "backend/images/services"); // destination folder
  },
  filename: (req, file, cback)=>{
    const fileName = path.parse(file.originalname.toLowerCase().split(' ').join('-')).name;
    const ext = MIME_TYPE_MAP[file.mimetype];

    cback(null, fileName + "-" + Date.now() + "." + ext);
  }

  });

const router = express.Router();


router.post("/addservice", multer({storage: storage}).single("image") ,(req, res) => {
  const url = req.protocol + "://" + req.get("host"); // server url

  const service = new Service({
    serviceName: req.body.serviceName,
    description: req.body.description,
    imagePath: url + "/images/services/"+ req.file.filename,
  });


  service.save()
  .then(createdservice =>{
    req.visitor.pageview(req.baseUrl + req.path).send();
    res.status(201).json({
      mesaage: "service created successfully",
      service: {
        ...createdservice,
        id: createdservice._id 

      }
    });
  })
  .catch(err =>{
    res.status(401).json({
      message: "Failed to create new service"
    });
  });
});


router.get("",(req, res, next) => {

  req.visitor.pageview(req.baseUrl + req.path).send();
  //pagination query
  const pageSize = +req.query.pagesize; 
  const currentPage = +req.query.page;
  const serviceQuery = Service.find();
  let fetchedservices;

  if(pageSize && currentPage){
    serviceQuery
    .skip( pageSize * (currentPage - 1))
    .limit(pageSize);
  }


 
  serviceQuery.then( documents => {
    fetchedservices = documents;
    return Service.countDocuments();
  })
  .then(count =>{
    res.status(200).json({
      message: 'Succesfully sent from api',
      body: fetchedservices,
      maxservices: count
    });
  });

});



router.get("/:id", (req, res, next) =>{

  Service.findById(req.params.id).then(service =>{
    if(service){
      req.visitor.pageview(req.baseUrl + req.path + req.params.id).send();
      res.status(200).json(service);
    }
    else{
      res.status(404).json({
        message: "service not found"
      })
    }
  });
})


router.put("/updateservice/:id", multer({storage: storage}).single("image"), (req, res, next) =>{

  const url = req.protocol + "://" + req.get("host"); // server url
  
  updateData = req.body;
  updateData.id = req.params.id;

  if(req.file){
    updateData.imagePath = url + "/images/services/" + req.file.filename;
  }

  Service.updateOne({_id: req.params.id}, {$set:updateData})
  .then(result => {
    req.visitor.pageview(req.baseUrl + req.path + req.params.id).send();
    res.status(200).json({ message: 'Update successful'})
  });
});


router.delete("/:id", (req, res, next) => {

  Service.deleteOne({_id: req.params.id}).then(result =>{
    req.visitor.pageview(req.baseUrl + req.path + req.params.id).send();
    res.status(200).json({
      message: 'document deleted'
    });
  });

});

module.exports = router;