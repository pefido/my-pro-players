const angular = require('angular');
const app = angular.module('app');
require('../services/dbRequest');
const summonerUtil = require('../services/summonerUtilities');

app.directive('player', [() => {
  return {
    restrict: 'E',
    templateUrl: './player.html',
    bindToController: true,
    controllerAs: 'vm',
    controller: ['Notification', '$q', '$scope', '$state', '$stateParams', 'dbRequest', function(Notification, $q, $scope, $state, $stateParams, dbRequest) {
      
      var vm = this;
      vm.player = {};
      vm.summoners = [];
      vm.Notification = Notification;
      vm.summonerInputText = "";
      

      dbRequest.getPlayer($stateParams.username).then((res) => {
        vm.player = res.data;
        dbRequest.getSummonersByPlayer(vm.player.username, (summoner) => {
          summonerUtil.fillLastPlayed(summoner);
          summonerUtil.fillNotPlayingMessage(summoner);
          vm.summoners.push(summoner);
          $scope.$apply();
        });
      }).catch((err) => {
        if(err.status === 404) {
          $state.transitionTo('notFound', {type:'Player'}, {location: false});
        }
      });

      vm.addSummoner = () => {
        return $q((resolve, reject) => {
          dbRequest.addSummonerToPlayer(vm.player.username, vm.summonerInputText).then((res) => {
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
        dbRequest.removeSummonerFromPlayer(vm.player.username, id).then((res) => {
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

    }]
  };
}]);
