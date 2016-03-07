var nodemailer = require('nodemailer');
var Project = require('./../models/project');
var contact = require('./../../config/contact');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: contact.email,
        pass: contact.password
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
