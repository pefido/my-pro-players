require('@uirouter/angularjs');
const angular = require('angular');
const app = angular.module('app', ['ui.router']);

require('./user');

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('user', {
    url: '/users/:id',
    template: '<user></user>',
  })
  .state('player', {
    url: '/players/:id',
    template: '<player></player>',
  });

  $locationProvider.html5Mode(true);
});