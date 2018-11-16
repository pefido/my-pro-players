const angular = require('angular');
const app = angular.module('app');

app.directive('focusOn', () => {
  return (scope, elem, attr) => {
    scope.$on('focusOn', (e, name) => {
      if (name === attr.focusOn) {
        elem[0].focus();
      }
    });
  };
});

app.factory('focus', ($rootScope, $timeout) => {
  return (name) => {
    $timeout(() => {
      $rootScope.$broadcast('focusOn', name);
    });
  }
});
