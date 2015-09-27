var express = require('express');
var router = express.Router();
var GoogleSpreadsheet = require("google-spreadsheet");
var spreadsheet = require('../config/local').spreadsheet;
var googleCreds = require('../config/local').googleCreds;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'NTHU ISS - Design Thinking Workshop'
  });
});

router.post('/register', function(req, res, next) {
  var name = req.body.name;
  var nickname = req.body.nickname;
  var phone = req.body.phone;
  var email = req.body.email;
  var food = req.body.food;
  var identity = req.body.identity;

  if (!name || !phone || !email || !food || !identity) {
    return res.json({
      error: true,
      msg: 'invalid params'
    });
  }

  food = food === 'vegetable' ? '素' : '葷';
  switch (identity) {
    case 'iss':
      identity = 'ISS 學生';
      break;
    case 'normal':
      identity = '一般學生';
      break;
    case 'society':
      identity = '社會人士';
      break;
  }
  var my_sheet = new GoogleSpreadsheet(spreadsheet.key);
  my_sheet.useServiceAccountAuth(googleCreds, function(err) {

    my_sheet.addRow(1, {
      name: name,
      nickname: nickname,
      phone: phone,
      email: email,
      food: food,
      identity: identity
    }, function(err) {
      if (err) {
        return res.json({
          error: true,
          msg: err
        })
      }

      return res.json({
        success: true
      });
    });
  });
});

module.exports = router;