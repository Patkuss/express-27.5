const express = require('express');
const router = express.Router();
const db = require('../db');
const uuidv4 = require('uuid/v4');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  for(let record of db.seats){
    if(record.id == req.params.id){
      res.json(record);
    };
  };
});

router.route('/seats').post((req, res) => {
  const {author, text} = req.body;
  const newPost = {id: uuidv4(), author: author, text: text};
  db.seats.push(newPost);
  res.send({message: 'OK'});
});

router.route('/seats/:id').put((req, res) => {
  const {author, text} = req.body;

  for(let record of db.seats){
    if(record.id == req.params.id){
      record.author = author;
      record.text = text;
    };
  };
    res.send({message: 'OK'});
});

router.route('/seats/:id').delete((req, res) => {
  for(let record of db.seats){
    if(record.id == req.params.id){
      db.seats.splice(db.seats.indexOf(record));
    };
  };
    res.send({message: 'OK'});
})

module.exports = router;