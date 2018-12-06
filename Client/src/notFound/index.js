const angular = require('angular');
const app = angular.module('app');

app.directive('notFound', [() => {
  return {
    restrict: 'E',
    templateUrl: './not-found.html',
    bindToController: true,
    controllerAs: 'vm',
    controller: ['$stateParams', function($stateParams) {
      var vm = this;
      vm.notFoundType = $stateParams.type;
    }]
  };
}]);
