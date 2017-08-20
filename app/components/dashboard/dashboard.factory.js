;
(function(window, angular, undefined) {
    'use strict';
    angular
        .module('app.dashboard')
        .factory('dashboardFactory', DashboardFactory);
    DashboardFactory.$inject = ['$http'];

    function DashboardFactory($http) {
        return {
            getResults: function() {
                return $http.get('assets/data/response.json').then(function(result) {
                        var data = result.data;
                        return data;
                    })
                    .catch(function(err) {
                        // for example, "re-throw" to "hide" HTTP specifics
                        return $q.reject("Data not available");
                    })
            },
        }
    }
}(window, angular, undefined));