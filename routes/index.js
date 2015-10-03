var express = require('express');
var router = express.Router();
var GoogleSpreadsheet = require("google-spreadsheet");
var spreadsheet = require('../config/local').spreadsheet;
var googleCreds = require('../config/local').googleCreds;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: '德克斯特的實驗室 | 2015設計思考工作坊'
  });
});

router.post('/register', function(req, res, next) {
  var name = req.body.name;
  var nickname = req.body.nickname;
  var phone = req.body.phone;
  var email = req.body.email;
  var food = req.body.food;
  var identity = req.body.identity;
  var speciality = req.body.speciality;
  var department = req.body.department;
  var imagination = req.body.imagination;

  if (!name || !phone || !email || !food || !identity || !imagination) {
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
      identity: identity,
      speciality: speciality,
      department: department,
      imagination: imagination
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