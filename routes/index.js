var express = require('express');
var router = express.Router();
var GoogleSpreadsheet = require("google-spreadsheet");
var spreadsheet = require('../config/local').spreadsheet;
var googleCreds = require('../config/local').googleCreds;
var sendMail = require('../lib/mandrill').sendMail;

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

      var mailOptions = {
        from: 'iss.design.thinking@gmail.com', // sender address
        to: email, // list of receivers
        to_name: name,
        subject: "2015設計思考工作坊報名成功", // Subject line
        footer: true,
        html: "親愛的" + name + "您好，" +
          "<br><br>我們已經收到您的報名資料，非常感謝您的報名。" +
          "<br>首先，請您確認您填寫的聯絡電話為" + phone + "；如果有誤請與我們聯繫！" +
          "<br><br>由於名額有限，我們將於報名截止後公布正、備取學員名單，無論錄取與否我們都將會寄信通知您，請記得留意信箱的信件唷！" +
          "<br>若您錄取了本工作坊活動，也請記得在收到錄取通知後迅速繳款，以利我們後續作業，詳細繳款資訊會在錄取通知信件中。" +
          "<br><br>以下為重要的時程提醒：" +
          "<br><span style=\"color: red\">10/19(一) 公佈錄取名單</span>" +
          "<br><span style=\"color: red\">10/22(四) 正取學員繳款截止日</span>" +
          "<br><br>謝謝您對我們的支持，期待與您相見！" +
          "<br><br>國立清華大學服務科學研究所 設計思考工作坊籌備小組"
      };
      sendMail(mailOptions);

      return res.json({
        success: true
      });
    });
  });
});

module.exports = router;