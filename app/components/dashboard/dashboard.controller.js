;
(function(window, angular, undefined) {
    'use strict';
    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController)
    DashboardController.$inject = ['dashboardFactory', 'dashboardService', 'dijkstraService', 'dashboardConstant'];

    function DashboardController(dashboardFactory, dashboardService, dijkstraService, dashboardConstant) {
        var vm = this;
        vm.start;
        vm.end;
        vm.type = dashboardConstant.FAST;
        vm.path=[];
        vm.init = function init() {
            dashboardFactory.getResults()
                .then(function(data) {
                    var deals = data.deals;
                    for (var i in deals) {
                        dashboardService.setRoute(dashboardConstant.FAST, deals[i]);
                        dashboardService.setRoute(dashboardConstant.CHEAP, deals[i]);
                    }
                    dashboardService.addVertex(dashboardConstant.FAST);
                    dashboardService.addVertex(dashboardConstant.CHEAP);
                });
        }();
        vm.list = function(source, target) {
            return Object.keys(dashboardService[dashboardConstant.FAST].routes);
        }
        vm.search = function() {
            vm.path = dashboardService.path(vm.type, vm.start, vm.end)
        }
        vm.setType = function(type) {
            vm.type = type;
        }

    }
}(window, angular, undefined));