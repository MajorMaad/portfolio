var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose'),
    path = require('path'),
    favicon = require('serve-favicon');

var db = require('./config/db');
mongoose.connect(process.env.MONGOLAB_URI || db.url);

var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/img/favicon.ico'));

var router = express.Router();
require('./app/routes')(router);
app.use('/api', router);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(port);
console.log('Listening on port ' + port);
exports = module.exports = app;
