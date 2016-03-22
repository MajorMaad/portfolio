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
        project.category = req.body.category;
        project.image = req.body.image;
        project.description = req.body.description;
        project.link = req.body.link;
        project.technologies = req.body.technologies;
        project.priority = req.body.priority;

        project.save(function(err) {
            if (err) res.send(err);
            else res.send(project);
        });
    },

    // Get a specific project
    getProject: function(req, res) {
        Project.findById(req.params.project_id, function(err, project) {
            if (err) res.send(err);

            res.json({
                message: 'Project saved'
            });
        });
    },

    // Update a project
    updateProject: function(req, res) {
        Project.findById(req.params.project_id, function(err, project) {
            if (err) res.send(err);

            project.title = req.body.title || project.title;
            project.category = req.body.category || project.category;
            project.image = req.body.image || project.image;
            project.description = req.body.description || project.description;
            project.link = req.body.link || project.link;
            project.technologies = req.body.technologies || project.technologies;
            project.priority = req.body.priority || project.priority;

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
