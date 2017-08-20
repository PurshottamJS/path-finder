;
(function(window, angular, undefined) {
    'use strict';
    angular
        .module('app.dashboard')
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'app/dashboard/dashboard.template.html',
                    controller: 'DashboardController as dashboard'
                })
        });
}(window, angular, undefined));