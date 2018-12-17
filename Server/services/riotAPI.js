const fs = require('fs');
const rp = require('request-promise-native');

class riotAPI {
  constructor() {
    this.riotAPIKey = JSON.parse(fs.readFileSync('./config/config.json')).riotAPIKey;
    this.baseUri = 'https://euw1.api.riotgames.com';
    this.dataDragonLastVersion = undefined;
    this.dataDragon = 'http://ddragon.leagueoflegends.com/cdn/';
    this.retryTimer = 1000;
    this.noServiceTimer = 1000;
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
      this.requestsPerSecond === 0 ? console.log("waiting requestsPerSecond") : console.log("waiting requestsPer2Min");
      setTimeout(() => {
        this.waitForRequests(callback);
      }, this.retryTimer);
    }
  }

  updateMaxRequests() {
    this.requestsPerSecond--;
    this.requestsPer2Min--;
  }

  retryRequest(resolve, requestFunction, argumentArray, retryTimer) {
    setTimeout(() => {
      resolve(requestFunction.apply(this, argumentArray));
    }, retryTimer);
  }

  getSummonerInfo(id) {
    return new Promise((resolve, reject) => {
      this.validateMaxRequests().then(() => {
        this.updateMaxRequests();
        return rp(this.baseUri + '/lol/summoner/v3/summoners/' + id, { qs: { api_key: this.riotAPIKey }, json: true });
      }).then((res) => {
        resolve(res);
      }).catch((err) => {
        switch(err.statusCode) {
          case 404:
            //mudar isto para um reject
            resolve(undefined);
            break;
          case 429:
            console.log("max requests reached, retrying in " + this.retryTimer + " ms - getSummonerInfo");
            this.retryRequest(resolve, this.getSummonerInfo, [id], this.retryTimer);
            break;
          case 503:
            console.log("getSummonerInfo Service unavailable, retrying in " + this.noServiceTimer + " ms");
            this.retryRequest(resolve, this.getSummonerInfo, [id], this.noServiceTimer);
            break;
          default:
            console.log("error getSummonerInfo");
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
        switch(err.statusCode) {
          case 404:
            //mudar isto para um reject
            resolve(undefined);
            break;
          case 429:
            console.log("max requests reached, retrying in " + this.retryTimer + " ms - getSpectatorInfo");
            this.retryRequest(resolve, this.getSpectatorInfo, [id], this.retryTimer);
            break;
          case 503:
            console.log("getSummonerInfo Service unavailable, retrying in " + this.noServiceTimer + " ms");
            this.retryRequest(resolve, this.getSpectatorInfo, [id], this.noServiceTimer);
            break;
          default:
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
        switch(err.statusCode) {
          case 404:
            //mudar isto para um reject
            reject(err);
            break;
          case 429:
            console.log("max requests reached, retrying in " + this.retryTimer + " ms - getLastMatchInfo");
            this.retryRequest(resolve, this.getLastMatchInfo, [accountId], this.retryTimer);
            break;
          case 503:
            console.log("getLastMatchInfo Service unavailable, retrying in " + this.noServiceTimer + " ms");
            this.retryRequest(resolve, this.getLastMatchInfo, [accountId], this.noServiceTimer);
            break;
          default:
            console.log("error getLastMatchInfo");
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
        switch(err.statusCode) {
          case 404:
            //mudar isto para um reject
            resolve(undefined);
            break;
          case 429:
            console.log("max requests reached, retrying in " + this.retryTimer + " ms - getFullMatchInfo");
            this.retryRequest(resolve, this.getFullMatchInfo, [gameId], this.retryTimer);
            break;
          case 503:
            console.log("getFullMatchInfo Service unavailable, retrying in " + this.noServiceTimer + " ms");
            this.retryRequest(resolve, this.getFullMatchInfo, [gameId], this.noServiceTimer);
            break;
          default:
            console.log("error getFullMatchInfo");
            console.log(err.message);
        }
      });
    });
  }


}

module.exports = new riotAPI();