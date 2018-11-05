const angular = require('angular');
const app = angular.module('app');

app.directive('user', [function() {
  return{
    restrict: 'E',
    templateUrl: './user.html',
    bindToController: true,
    controllerAs: 'vm',
    controller: [function(){
      var vm = this;
      vm.sampleText = "this is the user page";
    }]
  };
}]);