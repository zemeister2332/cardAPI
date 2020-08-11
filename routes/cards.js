const express = require('express');
const router = express.Router();
// CARDS SCHEMA
const Card = require('../models/Card');


// ADD CARD POST METHOD
router.post('/new', (req, res, next) => {
  //const {title, category, country, year,type} = req.body;

  const card = new Card(req.body);

  /*const card = new Card({
    title: title,
    category: category,
    country: country,
    year: year,
    type: type
  })*/
  /*card.save((err, data) => {
    if (err)
      res.json(err)

    res.json(data);
  })*/
  const promise = card.save();

  promise.then((data) => {
      res.json(data);
  }).catch((err) => {
      res.json(err);
  });

});

router.get('/', (req,res) => {
  const promise = Card.find({});

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
