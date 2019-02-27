const angular = require('angular');
const app = angular.module('app');

class Authentication {
  constructor($http, $q, $state) {
    this.authToken = localStorage.getItem('myProPlayersToken');
    this.authUser = localStorage.getItem('myProPlayersUser');
    this.$http = $http
    this.$q = $q;
    this.$state = $state;
    this.baseUri = "http://localhost:3000";
  }

  isAuthenticated() {
    return localStorage.getItem('myProPlayersToken') ? true : false;
  }

  deleteToken() {
    localStorage.removeItem('myProPlayersToken');
  }

  setToken(token) {
    localStorage.setItem('myProPlayersToken', token);
  }

  getToken() {
    return localStorage.getItem('myProPlayersToken');
  }

  setUser(user) {
    localStorage.setItem('myProPlayersUser', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('myProPlayersUser'));
  }

  deleteUser() {
    localStorage.removeItem('myProPlayersUser');
  }

  authenticate(email, password) {
    return this.$q((resolve, reject) => {
      this.$http.post(this.baseUri + "/authenticate", {
        email: email,
        password: password
      }).then((res) => {
        if(res.status === 200) {
          this.setToken(res.data.token);
          this.setUser(res.data.user);
          resolve();
        }
      }).catch((res) => {
        reject(res);
      });
    });
  }

  authHeader() {
    return {headers: {Authorization: this.getToken()} }
  }

  logout() {
    this.deleteToken();
  }

  handleUnauthorized(error) {
    if(error.data === "Unauthorized") {
      this.$state.transitionTo('authenticate');
    } else if(error.data === "Access denied") {
      this.$state.transitionTo('user', { id: this.getUser().id });
    } else {
      console.log(error);
    }
  }

}

app.service('Authentication', ['$http', '$q', '$state', Authentication]);