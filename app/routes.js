var jwt = require('jsonwebtoken');

var User = require('./models/user');

var ProjectHandler = require('./route-handlers/ProjectHandler');

var secret = require('../config/db').secret;

module.exports = function(router) {

    router.use(function(req, res, next) {
        //TODO: test request
        console.log('API Request');
        next();
    });

    //==================== GET PROJECTS ============================
    router.route('/projects')
        .get(ProjectHandler.getProjects);

    router.route('/projects/:project_id')
        .get(ProjectHandler.getProject);

    // ================= AUTHENTICATION =================================
    router.post('/authenticate', function(req, res) {
        User.findOne({
            name: req.body.name
        }, function(err, user) {
            if (err)
                res.send(err);

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else {
                if (user.password != req.body.password) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {
                    //TODO: Add attributes to the user and pass to the token
                    var token = jwt.sign(user.name, secret, {
                        expiresIn: 1440*60
                    });

                    res.json({
                        success: true,
                        message: 'Token delivered for 24h',
                        token: token
                    });
                }
            }
        });
    });

    router.use(function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });

    // ================= USERS =================================
    router.route('/users')
        .get(function(req, res) {
            User.find({}, function(err, users) {
                if (err)
                    res.send(err);

                res.json(users);
            });
        });
};
