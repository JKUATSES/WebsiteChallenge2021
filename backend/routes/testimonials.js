const express = require('express');
const multer = require("multer");
const path = require("path");

const checkAuth = require('../middleware/check-auth');

const Testimonial = require('../models/testimonial'); 

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
    cback(error, "backend/images/testimonials"); // destination folder
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
  const testimonial = new Testimonial({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/testimonials" + req.file.filename,
    authorName: req.body.authorName,
    authorCourse: req.body.authorCourse,
    date: new Date(req.body.date),
    claps: 0
  });

  testimonial.save()
  .then(createdTestimonial =>{
    req.visitor.pageview(req.baseUrl + req.path).send();
    
    res.status(201).json({
      mesaage: "testimonial created successfully",
      testimonial: {
        ...createdTestimonial,
        id: createdTestimonial._id 

      }
    });
  })
  .catch(err =>{
    res.status(401).json({
      message: "Failed to create new testimonial"
    });
  });
});


router.get("",(req, res, next) => {
  req.visitor.pageview(req.baseUrl + req.path).send();
  
  //pagination query
  const pageSize = +req.query.pagesize;  
  const currentPage = +req.query.page;
  const testimonialQuery = Testimonial.find();
  let fetchedTestimonials;

  if(pageSize && currentPage){
    testimonialQuery
    .skip( pageSize * (currentPage - 1))
    .limit(pageSize);
  }


  // static mongoose method to getting the documents in collection testimonials
  testimonialQuery.then( documents => {
    fetchedTestimonials = documents;
    return Testimonial.countDocuments();
  })
  .then(count =>{
    res.status(200).json({
      message: 'Succesfully sent from api',
      body: fetchedTestimonials,
      maxTestimonials: count
    });
  });

});


router.get("/:id", (req, res, next) =>{
  
  Testimonial.findById(req.params.id).then(testimonial =>{
    if(testimonial){
      req.visitor.pageview(req.baseUrl + req.path + req.params.id).send();
      res.status(200).json(testimonial);

    }
    else{
      res.status(404).json({
        message: "Testimonial not found"
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
    updateData.imagePath = url + "/images/testimonials/" + req.file.filename;
  }

  Testimonial.updateOne({_id: req.params.id}, {$set:updateData})
  .then(result => {
    req.visitor.pageview(req.baseUrl + req.path + req.params.id).send();
    res.status(200).json({ message: 'Update successful'})
  });
});


router.delete("/:id", checkAuth, (req, res, next) => {

  Testimonial.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
    req.visitor.pageview(req.baseUrl + req.path + req.params.id).send();
    res.status(200).json({
      message: 'document deleted'
    });
  });

});

module.exports = router;