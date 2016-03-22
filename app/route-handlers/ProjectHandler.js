var Project = require('./../models/project');

module.exports = {
    // Retrieve all projects
    getProjects: function(req, res) {
        Project.find(function(err, projects) {
            if (err) res.send(err);

            res.json(projects);
        });
    },

    // Create new project
    postProject: function(req, res) {
        var project = new Project();
        project.title = req.body.title;
        project.image = req.body.image;
        project.description = req.body.description;

        project.save(function(err) {
            if (err) res.send(err);
        });
    },

    // Get a specific project
    getProject: function(req, res) {
        Project.findById(req.params.project_id, function(err, project) {
            if (err) res.send(err);

            res.json(project);
        });
    },

    // Update a project
    updateProject: function(req, res) {
        Project.findById(req.params.project_id, function(err, project) {
            if (err) res.send(err);

            project.title = req.body.title;
            project.image = req.body.image;
            project.description = req.body.description;

            project.save(function(err) {
                if (err) res.send(err);

                res.json({
                    message: 'Project updated'
                });
            });
        });
    },

    // Delete a project
    deleteProject: function(req, res) {
        Project.remove({
            _id: req.params.project_id
        }, function(err, project) {
            if (err) res.send(err);

            res.json({
                message: 'Project deleted'
            });
        });
    }
};
