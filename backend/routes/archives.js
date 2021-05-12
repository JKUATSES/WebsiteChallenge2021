const express = require('express');



const Member = require('../models/member'); 
const Event = require('../models/event');


const router = express.Router();


router.get("/events",(req, res, next) => {

  req.visitor.pageview(req.baseUrl + req.path + req.params.id).send();

  //pagination query
  const pageSize = +req.query.pagesize; 
  const currentPage = +req.query.page;
  const eventsQuery = Event.find();

  //archive year query
  const year = +req.query.year;

  //archive year interval query
  const startYear = +req.query.startYear;
  const endYear = +req.query.endYear;

  let fetchedevents;


  if(pageSize && currentPage){
    eventsQuery
    .skip( pageSize * (currentPage - 1))
    .limit(pageSize);
  }

  if(startYear && endYear){
    eventsQuery.find(
        { date: 
            {$gte: new Date(startYear, 0, 1), $lte: new Date(endYear, 11, 31)}
    });
  }

  if(year){
    eventsQuery.find(
        { date: {$gte: new Date(+year, 0, 1)}
    });
  }

  eventsQuery.then( documents => {
    fetchedevents = documents;
    return Event.countDocuments();
  })
  .then(count =>{

    res.status(200).json({
      message: 'Succesfully sent from api',
      body: fetchedevents,
      documents: fetchedevents.length,
    });
  });

});

router.get("/members",(req, res, next) => {

  req.visitor.pageview(req.baseUrl + req.path).send();
  
    ///pagination query
  const pageSize = +req.query.pagesize; 
  const currentPage = +req.query.page;
  const eventsQuery = Member.find();

  //archive year query
  const year = +req.query.year;

  //archive year interval query
  const startYear = +req.query.startYear;
  const endYear = +req.query.endYear;

  let fetchedMembers;


  if(pageSize && currentPage){
    eventsQuery
    .skip( pageSize * (currentPage - 1))
    .limit(pageSize);
  }

  if(startYear && endYear){
    eventsQuery.find(
        { startDate: 
            {$gte: new Date(startYear, 0, 1)}

    });

    eventsQuery.find(
        { endDate: 
            {$lte: new Date(endYear, 11, 31)}

    });
  }


  if(year){
    eventsQuery.find(
        { startDate: {$gte: new Date(+year, 0, 1)}
    });
  }


  eventsQuery.then( documents => {
    fetchedMembers = documents;
    return Member.countDocuments();
  })
  .then(count =>{
    res.status(200).json({
      message: 'Succesfully sent from api',
      body: fetchedMembers,
      documents: fetchedMembers.length,
    });
  });
  
  });

module.exports = router;