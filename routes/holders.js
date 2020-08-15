const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
// Holder Schema
const Holder = require('../models/Holder');


// Holder Find GET Method
router.get('/', function(req, res, next) {
  const promise = Holder.aggregate([
    {
      $lookup: {
        from: 'cards',
        localField: '_id',
        foreignField: 'holder_id',
        as: 'cards'
      }
    },
    {
      $unwind: {
        path: '$cards',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id:{
            _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        cards: {
          $push: '$cards'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        cards: '$cards'
      }
    }


  ]);

  promise.then((holder) => {
    res.json(holder);
  }).catch((err) => {
    res.json(err);
  });
});

// Holder Add POST Method
router.post('/new', function(req, res, next) {
  const holder = new Holder(req.body);
  const promise = holder.save();

  promise.then((holder) => {
    res.json(holder);
  }).catch((err) => {
    res.json(err);
  });
});
// GET ONE HOLDER
router.get('/:holder_id', function(req, res, next) {
  const promise = Holder.aggregate([
    {
      $match: {
        '_id': mongoose.Types.ObjectId(req.params.holder_id)
      }
    },
    {
      $lookup: {
        from: 'cards',
        localField: '_id',
        foreignField: 'holder_id',
        as: 'cards'
      }
    },
    {
      $unwind: {
        path: '$cards',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id:{
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        cards: {
          $push: '$cards'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        cards: '$cards'
      }
    }


  ]);

  promise.then((holder) => {
    res.json(holder);
  }).catch((err) => {
    res.json(err);
  });
});

// Find Holder And Update By Id
router.put('/:holder_id', (req,res,next) => {
  const promise = Holder.findOneAndUpdate(
      req.params.holder_id,
      req.body,
      {
        new: true
      }
  );
  //console.log(req.params);

  promise.then((holder) => {
    if (!holder)
      next({ message: 'The holder is not defined', code: 99 })

    res.json(holder);
  }).catch((err) => {
    res.json(err);
  });
});
// Find Holder And Delete By Id
router.delete('/:holder_id', (req,res,next) => {
  const promise = Holder.findOneAndDelete(req.params.holder_id);
  //console.log(req.params);

  promise.then((card) => {
    if (!card)
      next({ message: 'The card is not defined', code: 99 })

    res.json({ status: 'OK DELETED' });
  }).catch((err) => {
    res.json(err);
  });
});

// Find Holder With Top 10 Amount Cards
router.get('/:holder_id/top10', (req,res) => {
  const promise = Holder.aggregate([
    {
      $match: {
        '_id':  mongoose.Types.ObjectId(req.params.holder_id)
      }
    },
    {
      $lookup:{
        from: 'cards',
        localField: '_id',
        foreignField: 'holder_id',
        as: 'cards'
      }
    },
    {
      $unwind: '$cards'
    },
    {
      $sort: {
        'cards.amount': -1
      }
    },
    {
      $limit: 10
    },
    {
      $group:{
        _id:{
          _id: '$_id'
        },
        cards: {
          $push: '$cards'
        }
      }
    },
    {
      $project: {
        _id: false,
        cards: '$cards'
      }
    }

  ])


  promise.then((card) => {
    res.json(card);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
