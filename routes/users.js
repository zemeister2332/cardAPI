const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const bcrypt = require('bcryptjs');

// User Model Init
const User = require('../models/User')

/* GET user page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

/* POST method for register user */
router.post('/register', (req, res, next) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({
      username,
      password: hash,

    })

    const promise = user.save();
    promise.then((data) => {
      res.json(data)
    }).catch((err) => {
      res.json(err);
    })
  });

});

/* POST method for Sign In user */
router.post('/signIn', (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({
    username
  }, (err, user) => {
    if (err)
      throw err;

    if (!user){
      res.json({
        status: false,
        message: 'Foydalanuvchi Topilmadi !!!'
      });
    }else{
      bcrypt.compare(password, user.password,).then((result) => {
        if (!result){
          res.json({
            status: false,
            message: 'Kirish Muvaffaqiyatsiz yoki Foydalanuvchi Topilmadi'
          })
        }else{
          const payload = {
            username,
          };
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 720 // 12soat
          })

          res.json({
            status: true,
            token
          })
        }
      });

    }

  })


});
module.exports = router;
