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
      vm.player.testField = "Rekkles";
      vm.player.id = $stateParams.id;
      console.log(vm.player);
      console.log("aqui");
      console.log($stateParams);
    }]
  };
}]);
