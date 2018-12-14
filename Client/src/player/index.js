const angular = require('angular');
const app = angular.module('app');
require('../services/dbRequest');

app.directive('player', [() => {
  return {
    restrict: 'E',
    templateUrl: './player.html',
    bindToController: true,
    controllerAs: 'vm',
    controller: ['$stateParams', 'dbRequest', function($stateParams, dbRequest) {
      
      var vm = this;
      vm.player = {};

      dbRequest.getPlayerProfile($stateParams.id).then((player) => {
        vm.player = player;
      }).catch(() => {
        if(err.status === 404) {
          $state.transitionTo('notFound', {type:'Player'}, {location: false});
        }
      });
    }]
  };
}]);
