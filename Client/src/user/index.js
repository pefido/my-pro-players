const angular = require('angular');
const app = angular.module('app');
require('../services/dbRequest');
const playerUtil = require('../services/playerUtilities');

app.directive('user', [function () {
  return {
    restrict: 'E',
    templateUrl: './user.html',
    bindToController: true,
    controllerAs: 'vm',
    controller: ['Clipboard', 'Notification', 'focus', '$stateParams', 'dbRequest', function (Clipboard, Notification, focus, $stateParams, dbRequest) {
      var vm = this;
      vm.Notification = Notification;
      vm.sampleText = "this is the user page";
      vm.addingPlayer = false;

      dbRequest.getUser($stateParams.id).then((res) => {
        vm.user = res.data;

        dbRequest.getPlayersByUser(vm.user.id).then((res) => {
          vm.players = res.data;
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
                res.data.playing ? vm.players.unshift(res.data) : vm.players.push(res.data);
                vm.Notification.setNotification('success', 'Player added!', 3);
                vm.toggleAddingPlayer();
              } else {
                //handle other kind of responses
              }
            }, (res) => {
              switch(res.status) {
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
          if(res.status === 200) {
            vm.players = vm.players.filter((player) => {return player.id != id});
            vm.user.followingPlayers = res.data;
            vm.Notification.setNotification('success', 'Player removed!', 3);
          } else {
            //handle other kind of responses
          }
        }, (res) => {
          switch(res.status) {
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
        if(player.playing) {
          var command = 'cd /Applications/League\ of\ Legends.app/Contents/LoL/RADS/solutions/lol_game_client_sln/releases/ && cd $(ls -1vr -d */ | head -1) && cd deploy && chmod +x ./LeagueofLegends.app/Contents/MacOS/LeagueofLegends && riot_launched=true ./LeagueofLegends.app/Contents/MacOS/LeagueofLegends 8394 LoLLauncher "" "-Locale=en_US" "spectator spectator.euw1.lol.riotgames.com:80 ' + player.currentMatch.observers.encryptionKey + ' ' + player.currentMatch.gameId + ' EUW1"';
          Clipboard.copyToClipboard(command);
          vm.Notification.setNotification('success', 'Spectator link copied to clipboard!', 4);
        }
      };

    }]
  };
}]);