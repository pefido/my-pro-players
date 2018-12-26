const angular = require('angular');
const app = angular.module('app');

app.directive('userSettingsModal', [function() {
  return {
    restrict: 'E',
    templateUrl: './userSettingsModal.html',
    scope: {
      settings: '=',
      isUserSettingsModalVisible: '=',
      toggleUserSettingsModalVisible: '=',
      changeUserSettings: '='
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: ['Notification', function(Notification) {
      var vm = this;
      vm.Notification = Notification;

    }]
  };
}]);