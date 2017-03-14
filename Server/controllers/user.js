var getUser = function (request, reply){
  reply('this is the profile page for user ' + request.params.user);
};

module.exports.handler = getUser;
