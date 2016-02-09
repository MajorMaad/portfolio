var User = require('./../models/user');
var passwordHash = require('password-hash');

module.exports = {
  getUsers: function(req, res) {
    User.find(function(err, users) {
      if (err) res.send(err);

      res.json(users);
    });
  },

  postUser: function(req, res) {
    var user = new User();
    user.name = req.body.name;
    user.password = req.body.password;

    project.save(function(err) {
      if(err) res.send(err);
    });
  },

  getProject: function(req, res) {
    Project.findById(req.params.project_id, function(err, project) {
      if (err) res.send(err);

      res.json(project);
    });
  },

  updateProject: function(req, res) {
    Project.findById(req.params.project_id, function(err, project) {
      if (err) res.send(err);

      project.title = req.body.title;
      project.image = req.body.image;
      project.description = req.body.description;

      project.save(function(err) {
        if (err) res.send(err);

        res.json({ message: 'Project updated' });
      });
    });
  },

  deleteProject: function(req, res) {
    Project.remove({
      _id: req.params.project_id
    }, function(err, project) {
      if (err) res.send(err);

      res.json({ message: 'Project deleted' });
    });
  }
};
