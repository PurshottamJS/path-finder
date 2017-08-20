;
(function(window, angular, undefined) {
    'use strict';
    angular
        .module('app.dashboard')
        .service('dashboardService', DashboardService);
    DashboardService.$inject = ['dashboardConstant', 'dijkstraService'];

    function DashboardService(dashboardConstant, dijkstraService) {
        var self = this;
        self.cheapest = {
                graph: new dijkstraService.Graph(),
                dijkstra: {},
                routes: {}
            },
            self.fastest = {
                graph: new dijkstraService.Graph(),
                dijkstra: {},
                routes: {}
            },
            self.setRoute = function(type, obj) {
                var val;
                if (type === dashboardConstant.CHEAP) {
                    val = obj.cost;
                } else {
                    val = self.getTime(obj.duration.h, obj.duration.m);
                }
                if (!self[type].dijkstra.hasOwnProperty(obj.departure)) {
                    self[type].dijkstra[obj.departure] = {};
                    self[type].dijkstra[obj.departure][obj.arrival] = val;

                    self[type].routes[obj.departure] = {};
                    self[type].routes[obj.departure][obj.arrival] = obj;
                    return;
                }
                if (!self[type].dijkstra[obj.departure].hasOwnProperty(obj.arrival)) {
                    self[type].dijkstra[obj.departure][obj.arrival] = val;
                    self[type].routes[obj.departure][obj.arrival] = obj;
                    return;
                }
                var oldCost = self[type].dijkstra[obj.departure][obj.arrival];
                var newCost = val;
                if (newCost < oldCost) {
                    self[type].dijkstra[obj.departure][obj.arrival] = newCost;
                    self[type].routes[obj.departure][obj.arrival] = obj;
                }
            },
            self.addVertex = function(type) {
                for (var i in self[type].dijkstra) {
                    self[type].graph.addVertex(i, self[type].dijkstra[i]);
                }
            }
        self.path = function(type, start, finish) {
            var serializePath, path = [];
            serializePath = self[type].graph.shortestPath(start, finish).concat([start]).reverse();
            for (var i = 0; i < serializePath.length - 1; i++) {
                var start = serializePath[i];
                var end = serializePath[i + 1];
                path.push(self[type].routes[start][end])
            }
            return path;
        }
        self.getTime = function(hour, min) {
            var hour = Number(hour || 0),
                min = Number(min || 0)
            return hour * 60 + min;
        };
    }
}(window, angular, undefined));