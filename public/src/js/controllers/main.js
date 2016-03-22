angular.module('projectController', [])

    .controller('mainController', function($scope, $http, Projects) {
        $scope.projects = [];

        // Get all the projects (call to the api, see ProjectHandler.js)
        Projects.getProjects()
            .success(function(projects) {
                $scope.projects = projects;
            });

        // Get the project by id (call to the api, see ProjectHandler.js)
        $scope.getProject = function(id) {
            Projects.getProject(id)
                .success(function(project) {
                    $scope.project = project;
                });
        };

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
                        $scope.errorFirstName = data.errors.firstName;
                        $scope.errorLastName = data.errors.lastName;
                        $scope.errorEmail = data.errors.email;
                        $scope.errorMessage = data.errors.message;
                        $scope.formSuccess = "error";
                    } else {
                        $scope.formSuccess = "success";
                    }
                });
            }
        };
  });
