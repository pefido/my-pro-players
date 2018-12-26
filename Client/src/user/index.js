const angular = require('angular');
const app = angular.module('app');
require("../components/entityList");
const playerUtil = require('../services/playerUtilities');

app.directive('user', [function () {
  return {
    restrict: 'E',
    templateUrl: './user.html',
    bindToController: true,
    controllerAs: 'vm',
    controller: ['$q', '$state', '$scope', '$sce', 'Clipboard', 'Notification', '$stateParams', 'dbRequest', function ($q, $state, $scope, $sce, Clipboard, Notification, $stateParams, dbRequest) {
      var vm = this;
      vm.user = {};
      vm.players = [];
      vm.Notification = Notification;
      vm.addingPlayer = false;
      vm.sce = $sce;
      vm.playerInputText = "";

      dbRequest.getUser($stateParams.id).then((res) => {
        vm.user = res.data;
        dbRequest.getPlayersByUser(vm.user.id, (player) => {
          playerUtil.fillLastPlayed(player);
          playerUtil.fillNotPlayingMessage(player);
          vm.players.push(player);
          $scope.$apply();
        });
      })
        .catch((err) => {
          if (err.status === 404) {
            $state.transitionTo('notFound', { type: 'User' }, { location: false });
          }
        });

      vm.getPlayerStatus = (player) => {
        return playerUtil.getPlayerStatus(player);
      };

      vm.addPlayer = () => {
        return $q((resolve, reject) => {
          dbRequest.addPlayerToUser(vm.user.id, vm.playerInputText).then((res) => {
            if (res.status === 200) {
              var player = res.data;
              vm.user.followingPlayers.push(player.id);
              playerUtil.fillLastPlayed(player);
              playerUtil.fillNotPlayingMessage(player);
              player.playing ? vm.players.unshift(player) : vm.players.push(player);
              vm.Notification.setNotification('success', 'Player added!', 3);
              resolve();
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
        });
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

      vm.copySpectateCommand = (player) => {
        if (player.playing) {
          var command = "";
          if (vm.user.settings.system === "mac") {
            command = 'cd /Applications/League\ of\ Legends.app/Contents/LoL/RADS/solutions/lol_game_client_sln/releases/ && cd $(ls -1vr -d */ | head -1) && cd deploy && chmod +x ./LeagueofLegends.app/Contents/MacOS/LeagueofLegends && riot_launched=true ./LeagueofLegends.app/Contents/MacOS/LeagueofLegends 8394 LoLLauncher "" "-Locale=en_US" "spectator spectator.euw1.lol.riotgames.com:80 ' + player.relevantSummoner.currentMatch.observers.encryptionKey + ' ' + player.relevantSummoner.currentMatch.gameId + ' EUW1"';
          } else {
            command = "some other command I need to find out";
          }

          Clipboard.copyToClipboard(command);
          vm.Notification.setNotification('success', 'Spectator command copied to clipboard!', 4);
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