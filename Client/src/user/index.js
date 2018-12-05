const angular = require('angular');
const app = angular.module('app');
require('../services/dbRequest');
const playerUtil = require('../services/playerUtilities');
const octicons = require("octicons");

app.directive('user', [function () {
  return {
    restrict: 'E',
    templateUrl: './user.html',
    bindToController: true,
    controllerAs: 'vm',
    controller: ['$scope', '$sce', 'Clipboard', 'Notification', 'focus', '$stateParams', 'dbRequest', function ($scope, $sce, Clipboard, Notification, focus, $stateParams, dbRequest) {
      var vm = this;
      vm.user = {};
      vm.players = [];
      vm.Notification = Notification;
      vm.sampleText = "this is the user page";
      vm.addingPlayer = false;
      vm.octicons = octicons;
      vm.sce = $sce;
      vm.isUserSettingsModalVisible = false;

      vm.addIcon = (icon, optionsObj) => {
        return $sce.trustAsHtml(octicons[icon].toSVG(optionsObj));
      };

      dbRequest.getUser($stateParams.id).then((res) => {
        vm.user = res.data;
        dbRequest.getPlayersByUser(vm.user.id, (player) => {
          playerUtil.fillLastPlayed(player);
          vm.players.push(player);
          $scope.$apply();
        });
      });

      vm.getPlayerStatus = (player) => {
        return playerUtil.getPlayerStatus(player);
      };

      vm.isAddingPlayer = () => {
        return vm.addingPlayer;
      };

      vm.toggleAddingPlayer = () => {
        vm.addingPlayer = !vm.addingPlayer;
        if (vm.addingPlayer) {
          vm.playerInputText = "";
          focus('newPlayerFocus');
        }
      };

      vm.addPlayer = (keyEvent) => {
        if (keyEvent.which === 13) {//enter key
          if (vm.playerInputText !== "" && vm.playerInputText !== undefined) {
            dbRequest.addPlayerToUser(vm.user.id, vm.playerInputText).then((res) => {
              if (res.status === 200) {
                vm.user.followingPlayers.push(res.data.id);
                playerUtil.fillLastPlayed(res.data);
                res.data.playing ? vm.players.unshift(res.data) : vm.players.push(res.data);
                vm.Notification.setNotification('success', 'Player added!', 3);
                vm.toggleAddingPlayer();
              } else {
                //handle other kind of responses
              }
            }, (res) => {
              switch (res.status) {
                case 404:
                  vm.Notification.setNotification('error', 'Player does not exist', 3);
                  break;
                case 409:
                  vm.Notification.setNotification('error', 'Player already followed', 3);
              }
            });
          }
        } else if (keyEvent.which === 27) {//escape key
          vm.toggleAddingPlayer();
        }
      };

      vm.removePlayer = (id) => {
        dbRequest.removePlayerFromUser(vm.user.id, id).then((res) => {
          if (res.status === 200) {
            vm.players = vm.players.filter((player) => { return player.id != id });
            vm.user.followingPlayers = res.data;
            vm.Notification.setNotification('success', 'Player removed!', 3);
          } else {
            //handle other kind of responses
          }
        }, (res) => {
          switch (res.status) {
            case 404:
              vm.Notification.setNotification('error', 'Player not followed', 3);
              break;
          }
        });
      }

      vm.toggleDeleteButtonVis = (player) => {
        player.deleteButtonInvisible = !player.deleteButtonInvisible
      };

      vm.copySpectateCommand = (player) => {
        if (player.playing) {
          var command = "";
          if (vm.user.settings.system === "mac") {
            command = 'cd /Applications/League\ of\ Legends.app/Contents/LoL/RADS/solutions/lol_game_client_sln/releases/ && cd $(ls -1vr -d */ | head -1) && cd deploy && chmod +x ./LeagueofLegends.app/Contents/MacOS/LeagueofLegends && riot_launched=true ./LeagueofLegends.app/Contents/MacOS/LeagueofLegends 8394 LoLLauncher "" "-Locale=en_US" "spectator spectator.euw1.lol.riotgames.com:80 ' + player.currentMatch.observers.encryptionKey + ' ' + player.currentMatch.gameId + ' EUW1"';
          } else {
            command = "some other command I need to find out";
          }

          Clipboard.copyToClipboard(command);
          vm.Notification.setNotification('success', 'Spectator command copied to clipboard!', 4);
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

      vm.changeUserSettings = () => {
        dbRequest.updateUserSettings(vm.user.id, vm.user.settings).then((res) => {
          if (res.status != 200) {
            vm.Notification.setNotification('error', 'Settings not saved!', 3);
          }
        })
          .catch((err) => {
            vm.Notification.setNotification('error', 'Settings not saved!', 3);
          });
      };

    }]
  };
}]);