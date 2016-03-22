angular.module('projectService', [])
    .factory('Projects', function($http) {
        return {
            getProject: function(id) {
                return $http.get('/api/projects/' + id);
            },

            getProjects: function() {
                return $http.get('/api/projects');
            }
        };
    });
