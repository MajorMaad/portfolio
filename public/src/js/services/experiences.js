angular.module('experienceService', [])
    .factory('Experiences', function($http) {
        return {
            getExperiences: function() {
                return $http.get('/api/experiences');
            }
        };
    });
