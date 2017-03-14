var controller = require('require-directory')(module, '../controllers');

var routes = [];

routes.push({path: '/', method: 'GET', config: controller.index});
routes.push({path: '/users', method: 'GET', config: controller.users});
routes.push({path: '/users/{user}', method: 'GET', config: controller.user});
routes.push({path: '/users/{user}/dashboard', method: 'GET', config: controller.dashboard});

module.exports = routes;
