require("../userSettingsModal");

const angular = require('angular');
const app = angular.module('app');
const octicons = require("octicons");

app.directive('entityList', [function() {
  return {
    restrict: 'E',
    templateUrl: './entityList.html',
    scope: {
      entities: '=',
      entityInputText: '=',
      addEntity: '=',
      removeEntity: '=',
      getEntityStatus: '=',
      copySpectateCommand: '=',
      entityType: '=',
      settings: '=',
      userId: '=',
      changeUserSettings: '='
    },
    bindToController: true,
    controllerAs: 'vm',
    controller: ['$sce', 'focus', function($sce, focus) {
      var vm = this;
      vm.addingEntity = false;
      vm.isUserSettingsModalVisible = false;

      vm.addIcon = (icon, optionsObj) => {
        return $sce.trustAsHtml(octicons[icon].toSVG(optionsObj));
      };

      vm.isAddingEntity = () => {
        return vm.addingEntity;
      };

      vm.toggleAddingEntity = () => {
        vm.addingEntity = !vm.addingEntity;
        if (vm.addingEntity) {
          vm.entityInputText = "";
          focus('newPlayerFocus');
        }
      };

      vm.toggleDeleteButtonVis = (entity) => {
        entity.deleteButtonInvisible = !entity.deleteButtonInvisible
      };

      vm.keyPressed = (keyEvent) => {
        if (keyEvent.which === 13) {//enter key
          if (vm.entityInputText !== "" && vm.entityInputText !== undefined) {
            vm.addEntity().then(() => {
              vm.toggleAddingEntity();
            });
          }
        } else if (keyEvent.which === 27) {//escape key
          vm.toggleAddingEntity();
        }
      };

      vm.toggleUserSettingsModalVisible = (event) => {
        if (event == undefined) {
          vm.isUserSettingsModalVisible = !vm.isUserSettingsModalVisible;
        } else if (event.which === 27) {//escape key
          vm.isUserSettingsModalVisible = !vm.isUserSettingsModalVisible;
        }
        if (vm.isUserSettingsModalVisible) {
          focus('userSettingsModal');
        }
      };

    }]
  };
}]);