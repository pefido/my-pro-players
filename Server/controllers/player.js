var getPlayer = function (request, reply){
  reply('this is the info route for ' + request.params.player);
};

var huniInfo = {
  "sktt1huni": {
    "summonerLevel": 30,
    "profileIconId": 1445,
    "revisionDate": 1490266637000,
    "id": 39010126,
    "name": "SKT T1 Huni"
  }
}

var accounts = [];
accounts.push(39010126);


module.exports.handler = getPlayer;
