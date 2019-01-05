const angular = require('angular');
const app = angular.module('app');
const summonerUtil = require('../services/summonerUtilities');
const playerUtil = require('../services/playerUtilities');

app.directive('player', [() => {
  return {
    restrict: 'E',
    templateUrl: './player.html',
    bindToController: true,
    controllerAs: 'vm',
    controller: ['Clipboard', 'Notification', '$q', '$scope', '$state', '$stateParams', 'dbRequest', function (Clipboard, Notification, $q, $scope, $state, $stateParams, dbRequest) {

      var vm = this;
      vm.player = {};
      vm.summoners = [];
      vm.Notification = Notification;
      vm.summonerInputText = "";
      vm.user = {};

      //tmp user
      dbRequest.getUser(1).then((res) => {
        vm.user = res.data;
      }).catch((err) => {
        if (err.status === 404) {
          console.log("user nopt found");
        }
      });


      dbRequest.getPlayer($stateParams.username).then((res) => {
        vm.player = res.data;
        dbRequest.getSummonersByPlayer(vm.player.name, (summoner) => {
          summonerUtil.fillLastPlayed(summoner);
          summonerUtil.fillNotPlayingMessage(summoner);
          vm.summoners.push(summoner);
          $scope.$apply();
        });
      }).catch((err) => {
        if (err.status === 404) {
          $state.transitionTo('notFound', { type: 'Player' }, { location: false });
        }
      });

      vm.addSummoner = () => {
        return $q((resolve, reject) => {
          dbRequest.addSummonerToPlayer(vm.player.name, vm.summonerInputText).then((res) => {
            if (res.status === 200) {
              var summoner = res.data;
              vm.player.playerAccounts.push(summoner.id);
              summonerUtil.fillLastPlayed(summoner);
              summonerUtil.fillNotPlayingMessage(summoner);
              summoner.playing ? vm.summoners.unshift(summoner) : vm.summoners.push(summoner);
              vm.Notification.setNotification('success', 'Summoner added!', 3);
              resolve();
            } else {
              //handle other kind of responses
            }
          }, (res) => {
            switch (res.status) {
              case 404:
                vm.Notification.setNotification('error', 'Summoner does not exist', 3);
                break;
              case 409:
                vm.Notification.setNotification('error', 'Summoner already added', 3);
            }
          });
        });
      };

      vm.removeSummoner = (id) => {
        dbRequest.removeSummonerFromPlayer(vm.player.name, id).then((res) => {
          if (res.status === 200) {
            vm.summoners = vm.summoners.filter((summoner) => { return summoner.id != id });
            vm.player.playerAccounts = res.data;
            vm.Notification.setNotification('success', 'Summoner removed!', 3);
          } else {
            //handle other kind of responses
          }
        }, (res) => {
          switch (res.status) {
            case 404:
              vm.Notification.setNotification('error', 'Summoner not present', 3);
              break;
          }
        });
      }

      vm.getSummonerStatus = (summoner) => {
        return summonerUtil.getSummonerStatus(summoner);
      };

      vm.getPlayerStatus = (player) => {
        return playerUtil.getPlayerStatus(player);
      };

      vm.copySpectateCommand = (summoner) => {
        if (summoner.playing) {
          var command = "";
          if (vm.user.settings.system === "mac") {
            command = 'cd /Applications/League\\ of\\ Legends.app/Contents/LoL/RADS/solutions/lol_game_client_sln/releases/ && cd $(ls -1vr -d */ | head -1) && cd deploy && chmod +x ./LeagueofLegends.app/Contents/MacOS/LeagueofLegends && riot_launched=true ./LeagueofLegends.app/Contents/MacOS/LeagueofLegends 8394 LoLLauncher "" "-Locale=en_US" "spectator spectator.euw1.lol.riotgames.com:80 ' + summoner.currentMatch.observers.encryptionKey + ' ' + summoner.currentMatch.gameId + ' EUW1"';
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
