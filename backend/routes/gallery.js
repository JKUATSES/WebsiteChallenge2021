const express = require('express');
const multer = require("multer");
const path = require("path");
const checkAuth = require('../middleware/check-auth');

const Photo = require('../models/photo'); 

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
    cback(error, "backend/images/gallery"); // destination folder
  },
  filename: (req, file, cback)=>{
    const fileName = path.parse(file.originalname.toLowerCase().split(' ').join('-')).name;
    const ext = MIME_TYPE_MAP[file.mimetype];

    cback(null, fileName + "-" + Date.now() + "." + ext);
  }

  });

const router = express.Router();


router.post("/addphoto", checkAuth, multer({storage: storage}).single("image") ,(req, res) => {
  const url = req.protocol + "://" + req.get("host"); // server url

  const photo = new Photo({
    imagePath: url + "/images/gallery/" + req.file.filename,
    description: req.body.description,
    date: new Date(req.body.date)
  });


  photo.save()
  .then(createdPhoto =>{
    req.visitor.pageview(req.baseUrl + req.path).send();
    res.status(201).json({
      mesaage: "Photo added successfully",
      photo: {
        ...createdPhoto,
        id: createdPhoto._id 

      }
    });
  })
  .catch(err =>{
    res.status(401).json({
      message: "Failed to add new photo"
    });
  });
});


router.get("",(req, res, next) => {

  //pagination query
  const pageSize = +req.query.pagesize; 
  const currentPage = +req.query.page;
  const galleryQuery = gallery.find();
  let fetchedPhotos;

  if(pageSize && currentPage){
    galleryQuery
    .skip( pageSize * (currentPage - 1))
    .limit(pageSize);
  }


 
  galleryQuery.then( documents => {
    fetchedPhotos = documents;
    return Gallery.countDocuments();
  })
  .then(count =>{
    req.visitor.pageview(req.baseUrl + req.path).send();
    res.status(200).json({
      message: 'Succesfully sent from api',
      body: fetchedPhotos,
      maxPhotos: count
    });
  });

});



router.get("/:id", (req, res, next) =>{

  Photo.findById(req.params.id).then(gallery =>{
    if(gallery){
      req.visitor.pageview(req.baseUrl + req.path + req.params.id).send();
      res.status(200).json(gallery);
    }
    else{
      res.status(404).json({
        message: "photo not found"
      })
    }
  });
})


router.put("/updatephoto/:id", checkAuth, multer({storage: storage}).single("image"), (req, res, next) =>{

  const url = req.protocol + "://" + req.get("host"); // server url
  
  updateData = req.body;
  updateData.id = req.params.id;
  updateData.date = new Date(req.body.date);

  if(req.file){
    updateData.imagePath = url + "/images/gallery/" + req.file.filename;
  }

  
  Photo.updateOne({_id: req.params.id}, {$set:updateData})
  .then(result => {
    req.visitor.pageview(req.baseUrl + req.path + req.params.id).send();
    res.status(200).json({ message: 'Update successful'})
  });
});


router.delete("/:id", checkAuth,(req, res, next) => {

  Photo.deleteOne({_id: req.params.id}).then(result =>{
    req.visitor.pageview(req.baseUrl + req.path + req.params.id).send();
    res.status(200).json({
      message: 'document deleted'
    });
  });

});

module.exports = router;