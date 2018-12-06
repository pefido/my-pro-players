require('@uirouter/angularjs');
const angular = require('angular');
const app = angular.module('app', ['ui.router']);

require('./services/appUtilities');
require('./services/notification');
require('./user');
require('./player');
require('./notFound');

app.controller('appController', ['$scope', 'Notification', ($scope, Notification) => {
  $scope.notificationObj = Notification.notificationObj;
}]);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('user', {
      url: '/users/:id',
      template: '<user></user>',
    })
    .state('player', {
      url: '/players/:id',
      template: '<player></player>',
    })
    .state('notFound', {
      url: '/not-found',
      template: '<not-found></not-found>',
      params: {
        type: "Resource"
      }
    });

  $locationProvider.html5Mode(true);
});