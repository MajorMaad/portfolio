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
  });
