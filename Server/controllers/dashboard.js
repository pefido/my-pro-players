var tmpPlayer = {
  name: 'Rekkles',
  nickname: 'FNC Rekkles',
  gameStatus: 'offline',
  lastPlayed: new Date(2017, 03, 14, 3, 24, 0)
};

var getDashboard = function (request, reply){
  reply('this is the dashboard screen of user ' + request.params.user + "\n" + JSON.stringify(tmpPlayer));
};

module.exports.handler = getDashboard;
