const express = require('express');
const multer = require("multer");

const Member = require('../models/member'); 

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
    cback(error, "backend/images/team"); // destination folder
  },
  filename: (req, file, cback)=>{
    const fileName = path.parse(file.originalname.toLowerCase().split(' ').join('-')).name;
    const ext = MIME_TYPE_MAP[file.mimetype];

    cback(null, fileName + "-" + Date.now() + "." + ext);
  }

  });

const router = express.Router();


router.post("/addmember", multer({storage: storage}).single("image") ,(req, res) => {
  const url = req.protocol + "://" + req.get("host"); // server url

  const member = new Member({
    email: req.body.email,
    phone: req.body.phone,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    imagePath: url + "/images/team/" + req.file.filename,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });


  member.save()
  .then(createdMember =>{
    res.status(201).json({
      mesaage: "Member created successfully",
      member: {
        ...createdMember,
        id: createdMember._id 

      }
    });
  })
  .catch(err =>{
    res.status(401).json({
      message: "Failed to create new member"
    });
  });
});


router.get("",(req, res, next) => {

  //pagination query
  const pageSize = +req.query.pagesize; 
  const currentPage = +req.query.page;
  const memberQuery = Member.find();
  let fetchedMembers;

  if(pageSize && currentPage){
    memberQuery
    .skip( pageSize * (currentPage - 1))
    .limit(pageSize);
  }


 
  memberQuery.then( documents => {
    fetchedMembers = documents;
    return Member.countDocuments();
  })
  .then(count =>{
    res.status(200).json({
      message: 'Succesfully sent from api',
      body: fetchedMembers,
      maxMembers: count
    });
  });

});



router.get("/:id", (req, res, next) =>{

  Member.findById(req.params.id).then(member =>{
    if(member){
      res.status(200).json(member);
    }
    else{
      res.status(404).json({
        message: "Member not found"
      })
    }
  });
})


router.put("/update-member/:id", multer({storage: storage}).single("image"), (req, res, next) =>{

  const url = req.protocol + "://" + req.get("host"); // server url
  
  updateData = req.body;
  updateData.id = req.params.id;

  if(req.file){
    updateData.imagePath = url + "/images/team/" + req.file.filename;
  }

  Member.updateOne({_id: req.params.id}, {$set:updateData})
  .then(result => {
    res.status(200).json({ message: 'Update successful'})
  });
});


router.delete("/:id", (req, res, next) => {

  Member.deleteOne({_id: req.params.id}).then(result =>{
    res.status(200).json({
      message: 'document deleted'
    });
  });

});

module.exports = router;