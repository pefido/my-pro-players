var getDashboard = function (request, reply){
  reply('this is the dashboard screen of user ' + request.params.user);
};

module.exports.handler = getDashboard;
