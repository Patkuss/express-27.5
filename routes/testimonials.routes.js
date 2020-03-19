const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuidv4 = require('uuid/v4');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
  for(let record of db.testimonials){
    if(record.id == req.params.id){
      res.json(record);
    };
  };
});

router.route('/testimonials/random').get((req, res) => {
  res.json('random');
});

router.route('/testimonials').post((req, res) => {
  const {author, text} = req.body;
  const newPost = {id: uuidv4(), author: author, text: text};
  db.testimonials.push(newPost);
  res.send({message: 'OK'});
});

router.route('/testimonials/:id').put((req, res) => {
  const {author, text} = req.body;

  for(let record of db.testimonials){
    if(record.id == req.params.id){
      record.author = author;
      record.text = text;
    };
  };
    res.send({message: 'OK'});
});

router.route('/testimonials/:id').delete((req, res) => {
  for(let record of db.testimonials){
    if(record.id == req.params.id){
      db.testimonials.splice(db.testimonials.indexOf(record));
    };
  };
    res.send({message: 'OK'});
})

module.exports = router;