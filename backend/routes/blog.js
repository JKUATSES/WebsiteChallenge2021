const express = require('express');
const multer = require("multer");

const Blog = require('../models/blog'); 

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
    cback(error, "backend/images/blog"); // destination folder
  },
  filename: (req, file, cback)=>{
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];

    cback(null, name + "-" + Date.now() + "." + ext);
  }

  });

const router = express.Router();


router.post("/create", multer({storage: storage}).single("image") ,(req, res) => {
  const url = req.protocol + "://" + req.get("host"); // server url
  const blog = new Blog({
    title: req.body.title,
    subTitle: req.body.subTitle,
    topic: req.body.topic,
    subTopic: req.body.subTitle,
    content: req.body.content,
    imagePath: url + "/images/blog" + req.file.filename,
    authorID: req.body.authorID,
    author: req.body.author,
    date: req.body.date,
    comments: {},
    claps: 0
  });

  blog.save()
  .then(createdBlog =>{
    res.status(201).json({
      mesaage: "blog created successfully",
      blog: {
        ...createdBlog,
        id: createdBlog._id 

      }
    });
  })
  .catch(err =>{
    res.status(401).json({
      message: "Failed to create new blog"
    });
  });
});


router.get("",(req, res, next) => {

  //pagination query
  const pageSize = +req.query.pagesize;  //+ sign converts the text/string to numeric
  const currentPage = +req.query.page;
  const blogQuery = Blog.find();
  let fetchedBlogs;

  if(pageSize && currentPage){
    //There is a more efficient way to query large data sets than this. Check this out https://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js
    blogQuery
    .skip( pageSize * (currentPage - 1))
    .limit(pageSize);
  }


  // static mongoose method to getting the documents in collection blogs
  blogQuery.then( documents => {
    fetchedBlogs = documents;
    return Blog.countDocuments();
  })
  .then(count =>{
    res.status(200).json({
      message: 'Succesfully sent from api',
      body: fetchedBlogs,
      maxBlogs: count
    });
  });

});



router.get("/:id", (req, res, next) =>{

  Blog.findById(req.params.id).then(blog =>{
    if(blog){
      res.status(200).json(blog);
    }
    else{
      res.status(404).json({
        message: "Blog not found"
      })
    }
  });
})


router.put("/update/:id", multer({storage: storage}).single("image"), (req, res, next) =>{

  const url = req.protocol + "://" + req.get("host"); // server url
  
  updateData = req.body;
  updateData.id = req.params.id;

  if(req.file){
    updateData.imagePath = url + "/images/blog/" + req.file.filename;
  }

  Blog.updateOne({_id: req.params.id}, {$set:updateData})
  .then(result => {
    res.status(200).json({ message: 'Update successful'})
  });
});


router.delete("/:id", (req, res, next) => {

  Blog.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({
      message: 'document deleted'
    });
  });

});

module.exports = router;