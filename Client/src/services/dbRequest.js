const angular = require('angular');
const app = angular.module('app');

class dbRequest {
  constructor($http) {
    this.$http = $http;
    this.baseUri = "http://localhost:3000";
  }

  //////////User Collection
  getUser(id){
    return this.$http.get(this.baseUri + "/users/" + id);
  }




  /////////Player Collection
  getPlayersByUser(id){
    return this.$http.get(this.baseUri + "/users/" + id + "/players");
  }

  getPlayer(username){
    return this.$http.get(this.baseUri + "/players/" + id);
  }

  addPlayerToUser(userId, playerUsername){
    return this.$http.post(this.baseUri + "/users/" + userId + "/players/", {'username': playerUsername});
  }

  removePlayerFromUser(userId, playerId){
    return this.$http.delete(this.baseUri + "/users/" + userId + "/players/" + playerId);
  }


}

app.service('dbRequest', dbRequest);