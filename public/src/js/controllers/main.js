angular.module('projectController', ['ngSanitize'])

    .controller('mainController', function($scope, $http, Projects, Experiences) {
        $scope.projects = [];
        $scope.experiences = [];

        // Get all the projects (call to the api, see ProjectHandler.js)
        Projects.getProjects()
            .success(function(projects) {
                $scope.projects = projects;
            });

        // Get all the experiences (call to the api, see ExperienceHandler.js)
        Experiences.getExperiences()
            .success(function(experiences) {
                $scope.experiences = experiences;
            });

        $scope.formData = {};
        $scope.formSuccess = null;

        // Function to process the form (get data from form + Post request to the api, see ContactHandler.js)
        $scope.processForm = function(isValid) {
            $scope.formSuccess = "processing";
            if (isValid) {
                $http({
                    method: 'POST',
                    url: '/api/contact',
                    data: $.param($scope.formData),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data) {
                    if (!data.success) {
                        $scope.formSuccess = "error";
                    } else {
                        $scope.formSuccess = "success";
                    }
                });
            }
        };

        // Display modal associated with specific project
        $scope.displayModal = function(id) {
            var modal_id = 'modal-' + id;
            var content = document.getElementById(modal_id);

            var modal = new Modal({
                content: content
            });

            modal.open();
        };
  });
