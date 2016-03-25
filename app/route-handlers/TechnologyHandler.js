var Project = require('./../models/project');
var Technology = require('./../models/technology');

module.exports = {
    // Get all the technologies of a specific project
    getTechnologies: function(req, res) {
        Project.findById(req.params.project_id, function(err, project) {
            if (err) res.send(err);

            res.json(project.technologies);
        });
    },

    // Add a new technology for a project
    postTechnology: function(req, res) {
        Project.findById(req.params.project_id, function(err, project) {
            if (err) res.send(err);

            var technology = new Technology();
            technology.name = req.body.name;
            technology.logo = req.body.logo;

            project.technologies.push(technology);

            project.save(function(err) {
                if (err) res.send(err);

                res.json(project);
            });
        });
    },

    // Get a specific technology of a specific project
    getTechnology: function(req, res) {
        Project.findById(req.params.project_id, function(err, project) {
            if (err) res.send(err);

            res.json(project.technologies.id(req.params.technology_id));
        });
    },

    // Update a technology of a project
    updateTechnology: function(req, res) {
        Project.findById(req.params.project_id, function(err, project) {
            if (err) res.send(err);

            project.technologies.id(req.params.technology_id).name = req.body.name || project.technologies.id(req.params.technology_id).name;
            project.technologies.id(req.params.technology_id).logo = req.body.logo || project.technologies.id(req.params.technology_id).logo;
            project.save(function(err) {
                if (err) res.send(err);

                res.json({ message: 'Technology updated' });
            });
        });
    },

    // Delete a technology off a project
    deleteTechnology: function(req, res) {
        Project.findById(req.params.project_id, function(err, project) {
            if (err) res.send(err);

            project.technologies.id(req.params.technology_id).remove();
            project.save(function(err) {
                if (err) res.send(err);

                res.json({ message: 'Technology removed' });
            });
        });
    }
};
