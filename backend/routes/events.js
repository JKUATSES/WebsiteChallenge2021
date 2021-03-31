const express = require('express');
const multer = require("multer");
const path = require("path");

const Event = require('../models/event'); 

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
    cback(error, "backend/images/events"); // destination folder
  },
  filename: (req, file, cback)=>{
    const fileName = path.parse(file.originalname.toLowerCase().split(' ').join('-')).name;
    const ext = MIME_TYPE_MAP[file.mimetype];

    cback(null, fileName + "-" + Date.now() + "." + ext);
  }

  });

const router = express.Router();


router.post("/addevent", multer({storage: storage}).single("image") ,(req, res) => {
  const url = req.protocol + "://" + req.get("host"); // server url

  const event = new Event({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    venue: req.body.venue,
    imagePath: url + "/images/events/" + req.file.filename,
  });


  event.save()
  .then(createdEvent =>{
    res.status(201).json({
      mesaage: "event created successfully",
      event: {
        ...createdEvent,
        id: createdEvent._id 

      }
    });
  })
  .catch(err =>{
      res.status(401).json({
      message: "Failed to create new event"
    });
  });
});


router.get("",(req, res, next) => {

  //pagination query
  const pageSize = +req.query.pagesize; 
  const currentPage = +req.query.page;
  const eventQuery = Event.find();
  let fetchedevents;

  if(pageSize && currentPage){
    eventQuery
    .skip( pageSize * (currentPage - 1))
    .limit(pageSize);
  }


 
  eventQuery.then( documents => {
    fetchedevents = documents;
    return fetchedevents.countDocuments();
  })
  .then(count =>{
    res.status(200).json({
      message: 'Succesfully sent from api',
      body: fetchedevents,
      maxevents: count
    });
  });

});



router.get("/:id", (req, res, next) =>{

  Event.findById(req.params.id).then(event =>{
    if(event){
      res.status(200).json(event);
    }
    else{
      res.status(404).json({
        message: "event not found"
      })
    }
  });
})


router.put("/updateevent/:id", multer({storage: storage}).single("image"), (req, res, next) =>{

  const url = req.protocol + "://" + req.get("host"); // server url
  
  updateData = req.body;
  updateData.id = req.params.id;

  if(req.file){
    updateData.imagePath = url + "/images/events/" + req.file.filename;
  }

  Event.updateOne({_id: req.params.id}, {$set:updateData})
  .then(result => {
    res.status(200).json({ message: 'Update successful'})
  });
});


router.delete("/:id", (req, res, next) => {

  Event.deleteOne({_id: req.params.id}).then(result =>{
    res.status(200).json({
      message: 'document deleted'
    });
  });

});

module.exports = router;