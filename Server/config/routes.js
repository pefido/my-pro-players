var controller = require('require-directory')(module, '../controllers');
//import controller from './controllers';
var routes = [];

/*
routes.push({path: '/', method: 'GET', config: {handler: function (request, reply) {
  var app = require('../package.json');
  reply({
    Name: app.name,
    Version: app.version
  });
}}});
*/

routes.push({path: '/', method: 'GET', config: controller.index});

module.exports = routes;
