var nodemailer = require('nodemailer');
var Project = require('./../models/project');
var password = require('./../../config/contact').password;

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'quentin.audinot@gmail.com',
        pass: password
    }
});

module.exports = {

    postMessage: function(req, res) {

        transporter.sendMail({
            from: req.body.email,
            to: 'quentin.audinot@gmail.com',
            subject: 'Portfolio message from : ' + req.body.firstName + ' ' + req.body.lastName,
            text: 'Email : ' + req.body.email + '\nMessage : \n' + req.body.message
        });

    }

};
