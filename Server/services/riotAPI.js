const fs = require('fs');
const rp = require('request-promise-native');

class riotAPI {
  constructor() {
    this.riotAPIKey = JSON.parse(fs.readFileSync('./config/config.json')).riotAPIKey;
    this.baseUri = 'https://euw1.api.riotgames.com';
    this.dataDragonLastVersion = undefined;
    this.dataDragon = 'http://ddragon.leagueoflegends.com/cdn/';
    this.retryTimer = 1000;
    this.requestsPerSecond = 20;
    this.requestsPer2Min = 100;
    this.resetMaxRequests();
  }

  resetMaxRequests() {
    setInterval(() => {
      if (this.requestsPerSecond <= 0) {
        this.requestsPerSecond = 20;
      }
    }, 1000);
    setInterval(() => {
      this.requestsPer2Min = 100;
    }, 120000);
  }

  validateMaxRequests() {
    return new Promise((resolve, reject) => {
      this.waitForRequests(() => {
        resolve();
      });
    });
  }

  waitForRequests(callback) {
    if (this.requestsPerSecond > 0 && this.requestsPer2Min > 0) {
      callback();
    } else {
      setTimeout(() => {
        this.waitForRequests(callback);
      }, this.retryTimer);
    }
  }

  updateMaxRequests() {
    this.requestsPerSecond--;
    this.requestsPer2Min--;
  }

  getPlayerInfo(id) {
    return new Promise((resolve, reject) => {
      this.validateMaxRequests().then(() => {
        this.updateMaxRequests();
        return rp(this.baseUri + '/lol/summoner/v3/summoners/' + id, { qs: { api_key: this.riotAPIKey }, json: true });
      }).then((res) => {
        resolve(res);
      }).catch((err) => {
        if (err.statusCode == 404) {
          //mudar isto para um reject
          resolve(undefined);
        } else if (err.statusCode == 429) {
          console.log("max requests reached, retrying in " + this.retryTimer + " ms");
          setTimeout(() => {
            resolve(this.getPlayerInfo(id));
          }, this.retryTimer);
        } else {
          console.log("error getPlayerInfo");
          console.log(err.message);
        }
      });
    });
  }

  getSpectatorInfo(id) {
    return new Promise((resolve, reject) => {
      this.validateMaxRequests().then(() => {
        this.updateMaxRequests();
        return rp(this.baseUri + '/lol/spectator/v3/active-games/by-summoner/' + id, { qs: { api_key: this.riotAPIKey }, json: true });
      }).then((res) => {
        resolve(res);
      }).catch((err) => {
        if (err.statusCode == 404) {
          //mudar isto para um reject
          resolve(undefined);
        } else if (err.statusCode == 429) {
          console.log("max requests reached, retrying in " + this.retryTimer + " ms");
          setTimeout(() => {
            resolve(this.getSpectatorInfo(id));
          }, this.retryTimer);
        } else {
          console.log("error getSpectatorInfo");
          console.log(err.message);
        }
      });
    });
  }

  getLastMatchInfo(accountId) {
    return new Promise((resolve, reject) => {
      this.validateMaxRequests().then(() => {
        this.updateMaxRequests();
        return rp(this.baseUri + '/lol/match/v3/matchlists/by-account/' + accountId, { qs: { endIndex: 1, api_key: this.riotAPIKey }, json: true });
      }).then((res) => {
        resolve(res.matches[0]);
      }).catch((err) => {
        if (err.statusCode == 404) {
          //mudar isto para um reject
          resolve(undefined);
        } else if (err.statusCode == 429) {
          console.log("max requests reached, retrying in " + this.retryTimer + " ms");
          setTimeout(() => {
            resolve(this.getLastMatchInfo(accountId));
          }, this.retryTimer);
        } else {
          console.log("error getLastMatchInfo: " + accountId);
          console.log(err.message);
        }
      });
    });
  }

  getDDragonLastVersion() {
    return new Promise((resolve, reject) => {
      if (!this.dataDragonLastVersion) {
        rp('https://ddragon.leagueoflegends.com/api/versions.json').then((res) => {
            resolve(JSON.parse(res)[0]);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        resolve(this.dataDragonLastVersion);
      }
    });
  }

  getChampionsListing() {
    return new Promise((resolve, reject) => {
      this.getDDragonLastVersion().then((dataDragonLastVersion) => {
        return rp(this.dataDragon + dataDragonLastVersion + '/data/en_US/champion.json');
      }).then((res) => {
        resolve(JSON.parse(res).data);
      });
    });
  }

  getFullMatchInfo(gameId) {
    return new Promise((resolve, reject) => {
      this.validateMaxRequests().then(() => {
        this.updateMaxRequests();
        return rp(this.baseUri + '/lol/match/v3/matches/' + gameId, { qs: { endIndex: 1, api_key: this.riotAPIKey }, json: true });
      }).then((res) => {
        resolve(res);
      }).catch((err) => {
        if (err.statusCode == 404) {
          //mudar isto para um reject
          resolve(undefined);
        } else if (err.statusCode == 429) {
          console.log("max requests reached, retrying in " + this.retryTimer + " ms");
          setTimeout(() => {
            resolve(this.getFullMatchInfo(gameId));
          }, this.retryTimer);
        } else {
          console.log("error getFullMatchInfo: " + gameId);
          console.log(err.message);
        }
      });
    });
  }


}

module.exports = new riotAPI();