const express = require('express');
const multer = require("multer");

const Partner = require('../models/partner'); 

const router = express.Router();


router.post("/addpartner",(req, res) => {
  const url = req.protocol + "://" + req.get("host"); // server url

  const partner = new Partner({
    companyName: req.body.companyName,
    status: req.body.status,
    startDate:  new Date(req.body.startDate),
    endDate: new Date(req.body.endDate)
  });


  partner.save()
  .then(createdpartner =>{
    req.visitor.pageview(req.baseUrl + req.path).send();
    res.status(201).json({
      mesaage: "partner created successfully",
      partner: {
        ...createdpartner,
        id: createdpartner._id 

      }
    });
  })
  .catch(err =>{
    res.status(401).json({
      message: "Failed to create new partner"
    });
  });
});


router.get("",(req, res, next) => {
  req.visitor.pageview(req.baseUrl + req.path).send();

  //pagination query
  const pageSize = +req.query.pagesize; 
  const currentPage = +req.query.page;
  const partnerQuery = partner.find();
  let fetchedpartners;

  if(pageSize && currentPage){
    partnerQuery
    .skip( pageSize * (currentPage - 1))
    .limit(pageSize);
  }


 
  partnerQuery.then( documents => {
    fetchedpartners = documents;
    return Partner.countDocuments();
  })
  .then(count =>{
    res.status(200).json({
      message: 'Succesfully sent from api',
      body: fetchedpartners,
      maxpartners: count
    });
  });

});



router.get("/:id", (req, res, next) =>{

  Partner.findById(req.params.id).then(partner =>{
    if(partner){
      req.visitor.pageview(req.baseUrl + req.path + req.params.id).send();
      res.status(200).json(partner);
    }
    else{
      res.status(404).json({
        message: "partner not found"
      })
    }
  });
})


router.put("/updatepartner/:id", (req, res, next) =>{

  const url = req.protocol + "://" + req.get("host"); // server url
  
  updateData = req.body;
  updateData.id = req.params.id;
  updateData.startDate = new Date(req.body.startDate);
  updateData.endDate = new Date(req.body.endDate);

  Partner.updateOne({_id: req.params.id}, {$set:updateData})
  .then(result => {
    req.visitor.pageview(req.baseUrl + req.path + req.params.id).send();
    res.status(200).json({ message: 'Update successful'})
  });
});


router.delete("/:id", (req, res, next) => {

  Partner.deleteOne({_id: req.params.id}).then(result =>{
    req.visitor.pageview(req.baseUrl + req.path + req.params.id).send();
    res.status(200).json({
      message: 'document deleted'
    });
  });

});

module.exports = router;