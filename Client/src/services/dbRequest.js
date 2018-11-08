const angular = require('angular');
const app = angular.module('app');

class dbRequest {
  constructor($http) {
    this.$http = $http;
    this.baseUri = "http://localhost:3000";
  }

  getUser(id){
    return this.$http.get(this.baseUri + "/users/" + id);
  }

  getPlayersByUser(id){
    return this.$http.get(this.baseUri + "/users/" + id + "/players");
  }
}

app.service('dbRequest', dbRequest);