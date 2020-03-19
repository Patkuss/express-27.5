const express = require('express');
const router = express.Router();
const db = require('../db');
const uuidv4 = require('uuid/v4');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  for(let record of db.concerts){
    if(record.id == req.params.id){
      res.json(record);
    };
  };
});

router.route('/concerts').post((req, res) => {
  const {author, text} = req.body;
  const newPost = {id: uuidv4(), author: author, text: text};
  db.concerts.push(newPost);
  res.send({message: 'OK'});
});

router.route('/concerts/:id').put((req, res) => {
  const {author, text} = req.body;

  for(let record of db.concerts){
    if(record.id == req.params.id){
      record.author = author;
      record.text = text;
    };
  };
    res.send({message: 'OK'});
});

router.route('/concerts/:id').delete((req, res) => {
  for(let record of db.concerts){
    if(record.id == req.params.id){
      db.concerts.splice(db.concerts.indexOf(record));
    };
  };
    res.send({message: 'OK'});
})

module.exports = router;