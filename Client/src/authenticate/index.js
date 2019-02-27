const angular = require('angular');
const app = angular.module('app');

app.directive('authenticate', [() => {
  return {
    restrict: 'E',
    templateUrl: './authenticate.html',
    bindToController: true,
    controllerAs: 'vm',
    controller: ['$stateParams', 'Authentication', 'Notification', '$state', function($stateParams, Authentication, Notification, $state) {
      var vm = this;
      vm.Notification = Notification;
      vm.email = "";
      vm.password = "";

      vm.authenticate = () => {
        Authentication.authenticate(vm.email, vm.password).then(() => {
          $state.transitionTo('user', { id: Authentication.getUser().id });
        }).catch((res) => {
          switch (res.status) {
            case 401:
              vm.Notification.setNotification('error', 'Wrong credentials', 3);
              break;
          }
        });
      }

    }]
  };
}]);
