const superagent = require('superagent');
const config = require('../config/config');

var accounts = [];
accounts.push({
  name: 'Velze',
  id: 35162075,
  status: {}
});

var resps = 0;
var getPlayer = function (request, reply){
  resps = 0;
  accounts.forEach(function(account){
    var url = 'https://euw.api.riotgames.com/observer-mode/rest/consumer/getSpectatorGameInfo/EUW1/' + account.id + '?api_key=' + config.riotApiKey;
    superagent.get(url, function(err, res){
      resps++;
      if (err) account.status = 'offline';
      else account.status = res;
      console.log(res.text);
      if(resps == accounts.length)
        reply(accounts);
    });
  })
};


module.exports.handler = getPlayer;
