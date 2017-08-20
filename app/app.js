;
(function(window, angular, undefined) {
    'use strict';
    angular
        .module('app')
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('default', {
                    url: '/',
                    templateUrl: 'app/components/dashboard/dashboard.template.html',
                    controller: 'DashboardController as dashboard'
                })
        });
}(window, angular, undefined));