var Experience = require('./../models/experience');

module.exports = {
    // Retrieve all experiences
    getExperiences: function(req, res) {
        Experience.find(function(err, experiences) {
            if (err) res.send(err);

            res.json(experiences);
        });
    },

    // Create new experience
    postExperience: function(req, res) {
        var experience = new Experience();
        experience.period = req.body.period;
        experience.description = req.body.description;
        experience.end_date = new Date(req.body.end_date);
        experience.start_date = new Date(req.body.start_date);
        experience.is_education = req.body.is_education;

        experience.save(function(err) {
            if (err) res.send(err);

            res.send(experience);
        });
    },

    // Get a specific experience
    getExperience: function(req, res) {
        Experience.findById(req.params.experience_id, function(err, experience) {
            if (err) res.send(err);

            res.json(experience);
        });
    },

    // Update an experience
    updateExperience: function(req, res) {
        Experience.findById(req.params.experience_id, function(err, experience) {
            if (err) res.send(err);

            experience.period = req.body.period || experience.period;
            experience.description = req.body.description || experience.description;
            experience.end_date = req.body.end_date === undefined ? experience.end_date : new Date(req.body.end_date);
            experience.start_date = req.body.start_date === undefined ? experience.start_date : new Date(req.body.start_date);
            experience.is_education = req.body.is_education || experience.is_education;

            experience.save(function(err) {
                if (err) res.send(err);

                res.json({ message: 'Experience updated' });
            });
        });
    },

    // Delete an experience
    deleteExperience: function(req, res) {
        Experience.remove({
            _id: req.params.experience_id
        }, function(err, experience) {
            if (err) res.send(err);

            res.json({ message: 'Experience deleted' });
        });
    }
};
