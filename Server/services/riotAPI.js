const fs = require('fs');
const rp = require('request-promise');

class riotAPI {
  constructor() {
    this.riotAPIKey = JSON.parse(fs.readFileSync('./config/config.json')).riotAPIKey;
    this.baseUri = 'https://euw1.api.riotgames.com';
  }

  getPlayerInfo(id, callback) {
    rp(this.baseUri + '/lol/summoner/v3/summoners/' + id, {qs: {api_key: this.riotAPIKey}, json: true})
      .then((res) => {
        callback(res);
      })
      .catch((err) => {
        console.log("erro getPlayerInfo");
        console.log(err.message);
      });
  }

  getSpectatorInfo(id, callback) {
    rp(this.baseUri + '/lol/spectator/v3/active-games/by-summoner/' + id, {qs: {api_key: this.riotAPIKey}, json: true})
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      if(err.statusCode == 404){
        callback(undefined);
      } else {
        console.log("erro getSpectatorInfo");
        console.log(err.message);
      }
    });
  }

}

module.exports = new riotAPI();