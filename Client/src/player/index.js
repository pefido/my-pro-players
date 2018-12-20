const angular = require('angular');
const app = angular.module('app');
require('../services/dbRequest');

app.directive('player', [() => {
  return {
    restrict: 'E',
    templateUrl: './player.html',
    bindToController: true,
    controllerAs: 'vm',
    controller: ['$state', '$stateParams', 'dbRequest', function($state, $stateParams, dbRequest) {
      
      var vm = this;
      vm.player = {};

      dbRequest.getPlayer($stateParams.username).then((res) => {
        vm.player = res.data;
      }).catch((err) => {
        if(err.status === 404) {
          $state.transitionTo('notFound', {type:'Player'}, {location: false});
        }
      });
    }]
  };
}]);
