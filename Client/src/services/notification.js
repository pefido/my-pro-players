const angular = require('angular');
const app = angular.module('app');

class Notification {
  constructor($timeout) {
    this.notificationObj = {
      display: false,
      type: "",
      message: "",
      time: 0
    }
    this.timeout = $timeout;
  }

  setNotification(type, message, time) {
    this.notificationObj.display = true;
    this.notificationObj.type = type;
    this.notificationObj.message = message;
    this.notificationObj.time = time * 1000;
    this.timeout(() => {
      this.disableNotification();
    },
    this.notificationObj.time);
  }

  disableNotification() {
    this.notificationObj.display = false;
  }

  getNotification() {
    return this.notificationObj;
  }

}

app.service('Notification', ['$timeout', Notification]);