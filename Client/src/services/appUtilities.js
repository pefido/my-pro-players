const angular = require('angular');
const app = angular.module('app');

app.directive('focusOn', () => {
  return (scope, elem, attr) => {
    scope.$on('focusOn', (e, name) => {
      if (name === attr.focusOn) {
        elem[0].focus();
      }
    });
  };
});

app.factory('focus', ($rootScope, $timeout) => {
  return (name) => {
    $timeout(() => {
      $rootScope.$broadcast('focusOn', name);
    });
  }
});

app.service('Clipboard',
  class clipboard {
    constructor() {}

    copyToClipboard(text) {
      var copyElement = document.createElement("span");
      copyElement.appendChild(document.createTextNode(text));
      copyElement.id = 'tmpCopyToClipboard';
      angular.element(document.body.append(copyElement));
      var range = document.createRange();
      range.selectNode(copyElement);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      copyElement.remove();
    }
  }
);
