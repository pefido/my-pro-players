const angular = require('angular');
const app = angular.module('app');
require('../services/dbRequest');
const playerUtil = require('../services/playerUtilities');

app.directive('user', [function() {
  return{
    restrict: 'E',
    templateUrl: './user.html',
    bindToController: true,
    controllerAs: 'vm',
    controller: ['$stateParams', 'dbRequest', function($stateParams, dbRequest){
      var vm = this;
      vm.sampleText = "this is the user page";

      dbRequest.getUser($stateParams.id).then( (res) => {
        vm.user = res.data;
      });

      dbRequest.getPlayersByUser($stateParams.id).then( (res) => {
        vm.players = res.data;
      });

      vm.getPlayerStatus = (player) => {
        return playerUtil.getPlayerStatus(player);
      };

    }]
  };
}]);