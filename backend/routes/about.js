const express = require('express');

const About = require('../models/about'); 

const router = express.Router();


router.post("/create", (req, res) => {
  const url = req.protocol + "://" + req.get("host"); // server url

  const about = new About({
    aboutUs: req.body.aboutUs,
    impact: req.body.impact,
    mission: req.body.mission,
    vision: req.body.vision,
    coreValues: req.body.coreValues
  });


  about.save()
  .then(createdabout =>{
    res.status(201).json({
      mesaage: "about created successfully",
      about: {
        ...createdabout,
        id: createdabout._id 

      }
    });
  })
  .catch(err =>{
    console.log(err);
    res.status(401).json({
      message: "Failed to create new about"
    });
  });
});


router.get("",(req, res, next) => {

  //pagination query
  const pageSize = +req.query.pagesize; 
  const currentPage = +req.query.page;
  const aboutQuery = About.find();
  let fetchedabouts;

  if(pageSize && currentPage){
    aboutQuery
    .skip( pageSize * (currentPage - 1))
    .limit(pageSize);
  }


 
  aboutQuery.then( documents => {
    fetchedabouts = documents;
    return About.countDocuments();
  })
  .then(count =>{
    res.status(200).json({
      message: 'Succesfully sent from api',
      body: fetchedabouts,
      maxAbouts: count
    });
  });

});



router.get("/:id", (req, res, next) =>{

  About.findById(req.params.id).then(about =>{
    if(about){
      res.status(200).json(about);
    }
    else{
      res.status(404).json({
        message: "about not found"
      })
    }
  });
})


router.put("/updateabout/:id", (req, res, next) =>{

  const url = req.protocol + "://" + req.get("host"); // server url
  
  updateData = req.body;
  updateData.id = req.params.id;

  About.updateOne({_id: req.params.id}, {$set:updateData})
  .then(result => {
    res.status(200).json({ message: 'Update successful'})
  });
});


router.delete("/:id", (req, res, next) => {

  About.deleteOne({_id: req.params.id}).then(result =>{
    res.status(200).json({
      message: 'document deleted'
    });
  });

});

module.exports = router;