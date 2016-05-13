var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var Project = require('./../models/project');

// Create the transporter to send emails
var transporter = nodemailer.createTransport(mg({
    auth: {
        api_key: process.env.EMAIL_API_KEY,
        domain: process.env.EMAIL_DOMAIN
    }
}));

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
            if (error) {
                data.sucess = false;
                data.error = error;
            }
            else data.success = true;

            res.json(data);
        });
    }

};
