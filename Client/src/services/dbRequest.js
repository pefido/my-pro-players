const angular = require('angular');
const app = angular.module('app');

const { NativeEventSource, EventSourcePolyfill } = require('event-source-polyfill');
const EventSource = NativeEventSource || EventSourcePolyfill;

class dbRequest {
  constructor($http, Authentication) {
    this.$http = $http;
    this.baseUri = "http://localhost:3000";
    this.Authentication = Authentication;
  }

  //////////User Collection
  getUser(id) {
    return this.$http.get(this.baseUri + "/users/" + id, this.Authentication.authHeader());
  }

  updateUserSettings(userId, settings) {
    return this.$http.put(this.baseUri + "/users/" + userId + "/settings/", settings, this.Authentication.authHeader());
  }




  /////////Player Collection
  getPlayersByUser(id, callback) {
    var retryTimer = 7000;
    var eventSource = new EventSourcePolyfill(this.baseUri + "/users/" + id + "/players?retry=" + retryTimer, this.Authentication.authHeader());
    var counter = 0;

    eventSource.addEventListener('playerSent', (e) => {
      counter++;
      console.log("got " + counter);
      callback(JSON.parse(e.data));
    });
    eventSource.onerror = () => {
      eventSource.close();
    }
  }

  getPlayer(username) {
    return this.$http.get(this.baseUri + "/players/" + username);
  }

  addPlayerToUser(userId, playerUsername) {
    return this.$http.post(this.baseUri + "/users/" + userId + "/players", { 'username': playerUsername }, this.Authentication.authHeader());
  }

  removePlayerFromUser(userId, playerId) {
    return this.$http.delete(this.baseUri + "/users/" + userId + "/players/" + playerId, this.Authentication.authHeader());
  }




  /////////Summoner Collection

  getSummonersByPlayer(username, callback) {
    var retryTimer = 7000;
    var eventSource = new EventSource(this.baseUri + "/players/" + username + "/summoners?retry=" + retryTimer);
    var counter = 0;

    eventSource.addEventListener('summonerSent', (e) => {
      counter++;
      console.log("got " + counter);
      callback(JSON.parse(e.data));
    });
    eventSource.addEventListener('summonerSentEnd', (e) => {
      eventSource.close();
    });
    eventSource.onerror = () => {
      eventSource.close();
    }
  }

  addSummonerToPlayer(playerUsername, summonerUsername) {
    return this.$http.post(this.baseUri + "/players/" + playerUsername + "/summoners", { 'username': summonerUsername });
  }

  removeSummonerFromPlayer(playerUsername, summonerId) {
    return this.$http.delete(this.baseUri + "/players/" + playerUsername + "/summoners/" + summonerId);
  }


}

app.service('dbRequest', ['$http', 'Authentication', dbRequest]);