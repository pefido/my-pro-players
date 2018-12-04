const fs = require('fs');
const rp = require('request-promise');

class riotAPI {
  constructor() {
    this.riotAPIKey = JSON.parse(fs.readFileSync('./config/config.json')).riotAPIKey;
    this.baseUri = 'https://euw1.api.riotgames.com';
    this.dataDragonLastVersion = undefined;
    this.dataDragon = 'http://ddragon.leagueoflegends.com/cdn/';
    this.reachedMaxRequests = false;
    this.retryTimer = 1000;
  }

  updateMaxRequestsReached() {
    this.reachedMaxRequests = true;
    setTimeout(() => {this.reachedMaxRequests = true}, this.retryTimer);
  }

  validateMaxRequests(callback) {
    if(this.reachedMaxRequests) {
      console.log("maxRequestsReached true");
      setTimeout(() => {callback()}, this.retryTimer);
    } else {
      callback();
    }
  }

  getPlayerInfo(id, callback) {
    this.validateMaxRequests(() => {
      rp(this.baseUri + '/lol/summoner/v3/summoners/' + id, { qs: { api_key: this.riotAPIKey }, json: true })
      .then((res) => {
        callback(res);
      })
      .catch((err) => {
        if (err.statusCode == 404) {
          callback(undefined);
        } else if(err.statusCode == 429) {
          this.updateMaxRequestsReached();
          console.log("max requests reached, retrying in " + this.retryTimer + " ms");
          this.getPlayerInfo(id, callback);
        } else {
          console.log("error getPlayerInfo");
          console.log(err.message);
        }
      });
    });
  }

  getSpectatorInfo(id, callback) {
    this.validateMaxRequests(() => {
      rp(this.baseUri + '/lol/spectator/v3/active-games/by-summoner/' + id, { qs: { api_key: this.riotAPIKey }, json: true })
      .then((res) => {
        callback(res);
      })
      .catch((err) => {
        if (err.statusCode == 404) {
          callback(undefined);
        } else if(err.statusCode == 429) {
          this.updateMaxRequestsReached();
          console.log("max requests reached, retrying in " + this.retryTimer + " ms");
          this.getSpectatorInfo(id, callback);
        } else {
          console.log("error getSpectatorInfo");
          console.log(err.message);
          console.log(err);
        }
      });
    });
  }

  getLastMatchInfo(accountId, callback) {
    this.validateMaxRequests
    rp(this.baseUri + '/lol/match/v3/matchlists/by-account/' + accountId, { qs: { endIndex: 1, api_key: this.riotAPIKey }, json: true })
      .then((res) => {
        callback(res.matches[0]);
      })
      .catch((err) => {
        if (err.statusCode == 404) {
          callback(undefined);
        } else if(err.statusCode == 429) {
          this.updateMaxRequestsReached();
          console.log("max requests reached, retrying in " + this.retryTimer + " ms");
          this.getLastMatchInfo(accountId, callback);
        } else {
          console.log("error getLastMatchInfo: " + accountId);
        }
      });
  }

  getDDragonLastVersion(callback) {
    if (!this.dataDragonLastVersion) {
      rp('https://ddragon.leagueoflegends.com/api/versions.json')
        .then((res) => {
          callback(JSON.parse(res)[0]);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      callback(this.dataDragonLastVersion);
    }
  }

  getChampionsListing(callback) {
    this.getDDragonLastVersion((dataDragonLastVersion) => {
      rp(this.dataDragon + dataDragonLastVersion + '/data/en_US/champion.json')
      .then((res) => {
        callback(JSON.parse(res).data);
      });
    });
  }

  getFullMatchInfo(gameId, callback) {
    this.validateMaxRequests(() => {
      rp(this.baseUri + '/lol/match/v3/matches/' + gameId, { qs: { endIndex: 1, api_key: this.riotAPIKey }, json: true })
      .then((res) => {
        callback(res);
      })
      .catch((err) => {
        if (err.statusCode == 404) {
          callback(undefined);
        } else if(err.statusCode == 429) {
          this.updateMaxRequestsReached();
          console.log("max requests reached, retrying in " + this.retryTimer + " ms");
          this.getFullMatchInfo(gameId, callback);
        } else {
          console.log("error getFullMatchInfo: " + gameId);
        }
      });
    });
  }


}

module.exports = new riotAPI();