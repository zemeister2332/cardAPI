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
// Find all cards GET Method
router.get('/', (req,res) => {
  const promise = Card.find({});

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

// Find Cards With Top 10 Amount
router.get('/topAmount10', (req,res) => {
  const promise = Card.find({ }).limit(10).sort({amount: 1});


  promise.then((card) => {
    res.json(card);
  }).catch((err) => {
    res.json(err);
  });
});

// Find Cards With Top 10 Amount
router.get('/between/:start_year/:end_year', (req,res) => {
  const { start_year ,end_year } = req.params;
  const promise = Card.find(
      {
        year: {"$gte": parseInt(start_year), "$lte": parseInt(end_year)}

        //>= 2020   ;2020,2021,2022,2023,2024,2025....2200gacha;    <= 2200
      }
  );
  promise.then((card) => {
    res.json(card);
  }).catch((err) => {
    res.json(err);
  });
});

// Find Cards By Id
router.get('/:card_id', (req,res,next) => {
  const promise = Card.findById(req.params.card_id);
  //console.log(req.params);

  promise.then((card) => {
    if (!card)
      next({ message: 'The card is not defined', code: 99 })

    res.json(card);
  }).catch((err) => {
    res.json(err);
  });
});

// Find Cards And Update By Id
router.put('/:card_id', (req,res,next) => {
  const promise = Card.findByIdAndUpdate(
      req.params.card_id,
      req.body,
      {
        new: true
      }
  );
  //console.log(req.params);

  promise.then((card) => {
    if (!card)
       next({ message: 'The card is not defined', code: 99 })

    res.json(card);
  }).catch((err) => {
    res.json(err);
  });
});
// Find Cards And Delete By Id
router.delete('/:card_id', (req,res,next) => {
  const promise = Card.findByIdAndRemove(req.params.card_id);
  //console.log(req.params);

  promise.then((card) => {
    if (!card)
      next({ message: 'The card is not defined', code: 99 })

    res.json({ status: 'OK DELETED' });
  }).catch((err) => {
    res.json(err);
  });
});


module.exports = router;
