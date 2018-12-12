const angular = require('angular');
const app = angular.module('app');

class dbRequest {
  constructor($http, $q) {
    this.$http = $http;
    this.baseUri = "http://localhost:3000";
  }

  //////////User Collection
  getUser(id) {
    return this.$http.get(this.baseUri + "/users/" + id);
  }

  updateUserSettings(userId, settings) {
    return this.$http.put(this.baseUri + "/users/" + userId + "/settings/", settings);
  }




  /////////Player Collection
  getPlayersByUser(id, callback) {
    var retryTimer = 7000;
    var eventSource = new EventSource(this.baseUri + "/users/" + id + "/players?retry=" + retryTimer);
    var counter = 0;

    eventSource.addEventListener('playerSent', (e) => {
      counter++;
      console.log("got " + counter);
      callback(JSON.parse(e.data));
    });
    eventSource.addEventListener('playerSentEnd', (e) => {
      eventSource.close();
    });
    eventSource.onerror = () => {
      eventSource.close();
    }
  }

  getPlayer(username) {
    return this.$http.get(this.baseUri + "/players/" + id);
  }

  addPlayerToUser(userId, playerUsername) {
    return this.$http.post(this.baseUri + "/users/" + userId + "/players/", { 'username': playerUsername });
  }

  removePlayerFromUser(userId, playerId) {
    return this.$http.delete(this.baseUri + "/users/" + userId + "/players/" + playerId);
  }


}

app.service('dbRequest', dbRequest);