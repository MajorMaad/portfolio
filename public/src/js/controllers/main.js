angular.module('projectController', [])

  .controller('mainController', function($scope, $http, Projects) {
    Projects.getProjects()
      .success(function(projects) {
        $scope.projects = projects;
      });

    $scope.getProject = function(id) {
      Projects.getProject(id)
        .success(function(project) {
          $scope.project = project;
        });
    };

    $scope.formData = {};

    $scope.processForm = function(isValid) {
        
        if (isValid) {
            $http({
                method: 'POST',
                url: '/api/contact',
                data: $.param($scope.formData),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(function(data) {
                console.log(data);

                if (!data.success) {
                    $scope.errorFirstName = data.errors.firstName;
                    $scope.errorLastName = data.errors.lastName;
                    $scope.errorEmail = data.errors.email;
                    $scope.errorMessage = data.errors.message;
                } else {
                    $scope.message = data.message;
                }
            });
        }
    };
  });
