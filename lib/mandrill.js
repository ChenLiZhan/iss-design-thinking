var mandrill_key = require('../config/local').mandrill;
var mandrill = require('node-mandrill')(mandrill_key);

var sendMandrill = function(mailOptions) {
    mandrill('/messages/send', {
        message: mailOptions
    }, function(error, response) {
        if (error) {
            console.error(JSON.stringify(error));
        } else {
            console.log(response);
            // mailOptions.response = response;
            // mailOptions.createdAt = new Date();
            // mailOptions.updatedAt = new Date();
            // pagelogs_mongo.maillogs.insert(mailOptions, function(err, result) {
            //     if (err) {
            //         console.error(err);
            //     }
            // });
            // if (response.length && response[0].status !== 'sent') {
            //     slackbot.phantom("[sendMandrill] : " + JSON.stringify(response) + "====\n" + JSON.stringify(mailOptions));
            // }
        }
    });
};

exports.sendMail = function(options) {
    console.log(options);
    var html = options.html;
    if (options.footer) {
        html = html +
            "<br><br><b>請勿回覆此信，如有任何疑問請聯繫：" +
            "<br>報名組聯絡人  顏薇  0933460180  wei.yen@iss.nthu.edu.tw"
    }
    var mailOptions = {
        from_email: options.from,
        from_name: '清華大學服務科學所', // sender address
        to: [{
            "email": options.to,
            "name": options.to_name
        }], // list of receivers
        subject: options.subject, // Subject line
        html: html
    };
    sendMandrill(mailOptions);
};