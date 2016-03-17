var nodemailer = require('nodemailer');
var Project = require('./../models/project');
var contact = require('./../../config/contact');

// Create the transporter to send emails
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: contact.email,
        pass: contact.password
    }
});

module.exports = {

    // Function that will send the email (first name, last name, email, message)
    postMessage: function(req, res) {
        var data = req.body;

        transporter.sendMail({
            from: data.email,
            to: 'quentin.audinot@gmail.com',
            subject: 'Portfolio message from : ' + data.firstName + ' ' + data.lastName,
            text: 'Email : ' + data.email + '\nMessage : \n' + data.message
        }, function(error, info) {
            if (error) data.sucess = false;
            else data.success = true;

            res.json(data);
        });
    }

};
