const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuidv4 = require('uuid/v4');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
  for(let post of db.testimonials){
    if(post.id == req.params.id){
      res.json(post);
    };
  };
});

router.route('/testimonials').post((req, res) => {
  const {author, text} = req.body;
  const newPost = {author: author, text: text, id: uuidv4()};
  db.testimonials.push(newPost);
  res.json({message: 'OK'});
})

router.route('/testimonials/:id').put((req, res) => {
  const {author, text} = req.body;
  for(let post of db.testimonials){
    if(post.id == req.params.id){
      post.author = author;
      post.text = text;
    };
  };
  res.json({message: 'OK'});
})

router.route('/testimonials/:id').delete((req, res) => {
  for(let post of db.testimonials){
    if(post.id == req.params.id){
      db.testimonials.splice(db.testimonials.indexOf(post));
    };
  };
  res.json({message: 'OK'});
})

module.exports = router;