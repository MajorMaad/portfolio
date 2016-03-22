var jwt = require('jsonwebtoken');

var User = require('./models/user');

var ContactHandler = require('./route-handlers/ContactHandler');
var ProjectHandler = require('./route-handlers/ProjectHandler');

var secret = process.env.SECRET;

module.exports = function(router) {

    router.use(function(req, res, next) {
        //TODO: test request
        next();
    });

    //==================== FORM ============================
    router.route('/contact')
        .post(ContactHandler.postMessage);

    //==================== GET PROJECTS ============================
    router.route('/projects')
        .get(ProjectHandler.getProjects);
    router.route('/projects/:project_id')
        .get(ProjectHandler.getProject);

    // ================= AUTHENTICATION =================================
    router.post('/authenticate', function(req, res) {
        if (req.body.name == process.env.ADMIN_NAME && req.body.password == process.env.ADMIN_PASSWORD) {
            var token = jwt.sign(req.body.name, secret, {
                expiresIn: 1440*60
            });

            res.json({
                success: true,
                message: 'Token delivered for 24h',
                token: token
            });
        } else {
            res.json({
                success: false,
                message: 'Authentication failed.'
            });
        }
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

    // ================= PROJECTS ==============================
    router.route('/projects')
        .post(ProjectHandler.postProject);
    router.route('/projects/:project_id')
        .put(ProjectHandler.updateProject)
        .delete(ProjectHandler.deleteProject);
};
