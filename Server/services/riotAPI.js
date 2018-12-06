const fs = require('fs');
const rp = require('request-promise');

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
      if(this.requestsPerSecond <= 0) {
        this.requestsPerSecond = 20;
      }
    }, 1000);
    setInterval(() => {
      this.requestsPer2Min = 100;
    }, 120000);
  }

  validateMaxRequests() {
      if(this.requestsPerSecond > 0 && this.requestsPer2Min > 0) {
        return;
      } else {
        setTimeout(() => {
          console.log("requests exceeded");
          this.validateMaxRequests();
        }, this.retryTimer);
      }
  }

  updateMaxRequests() {
    console.log("requests sec: " + this.requestsPerSecond);
    console.log("requests 2min: " + this.requestsPer2Min);
    this.requestsPerSecond--;
    this.requestsPer2Min--;
  }

  getPlayerInfo(id) {
    return new Promise((resolve, reject) => {
      this.validateMaxRequests.then(() => {
        this.updateMaxRequests();
        return rp(this.baseUri + '/lol/summoner/v3/summoners/' + id, { qs: { api_key: this.riotAPIKey }, json: true });
      }).then((res) => {

      }).catch((err) => {

      });
    });
  }

  // getPlayerInfo(id, callback) {
  //   this.validateMaxRequests(() => {
  //     this.updateMaxRequests();
  //     rp(this.baseUri + '/lol/summoner/v3/summoners/' + id, { qs: { api_key: this.riotAPIKey }, json: true })
  //       .then((res) => {
  //         callback(res);
  //       })
  //       .catch((err) => {
  //         if (err.statusCode == 404) {
  //           callback(undefined);
  //         } else if (err.statusCode == 429) {
  //           console.log("max requests reached, retrying in " + this.retryTimer + " ms");
  //           setTimeout(() => {
  //             this.getPlayerInfo(id, callback);
  //           }, this.retryTimer);
  //         } else {
  //           console.log("error getPlayerInfo");
  //           console.log(err.message);
  //         }
  //       });
  //   });
  // }



  getSpectatorInfo(id, callback) {
    this.validateMaxRequests(() => {
      this.updateMaxRequests();
      rp(this.baseUri + '/lol/spectator/v3/active-games/by-summoner/' + id, { qs: { api_key: this.riotAPIKey }, json: true })
        .then((res) => {
          callback(res);
        })
        .catch((err) => {
          if (err.statusCode == 404) {
            callback(undefined);
          } else if (err.statusCode == 429) {
            console.log("max requests reached, retrying in " + this.retryTimer + " ms");
            setTimeout(() => {
              this.getSpectatorInfo(id, callback);
            }, this.retryTimer);
          } else {
            console.log("error getSpectatorInfo");
            console.log(err.message);
          }
        });
    });
  }

  getLastMatchInfo(accountId, callback) {
    this.validateMaxRequests(() => {
      this.updateMaxRequests();
      rp(this.baseUri + '/lol/match/v3/matchlists/by-account/' + accountId, { qs: { endIndex: 1, api_key: this.riotAPIKey }, json: true })
        .then((res) => {
          callback(res.matches[0]);
        })
        .catch((err) => {
          if (err.statusCode == 404) {
            callback(undefined);
          } else if (err.statusCode == 429) {
            console.log("max requests reached, retrying in " + this.retryTimer + " ms");
            setTimeout(() => {
              this.getLastMatchInfo(accountId, callback);
            }, this.retryTimer);
          } else {
            console.log("error getLastMatchInfo: " + accountId);
            console.log(err.message);
          }
        });
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
      this.updateMaxRequests();
      rp(this.baseUri + '/lol/match/v3/matches/' + gameId, { qs: { endIndex: 1, api_key: this.riotAPIKey }, json: true })
        .then((res) => {
          callback(res);
        })
        .catch((err) => {
          if (err.statusCode == 404) {
            callback(undefined);
          } else if (err.statusCode == 429) {
            console.log("max requests reached, retrying in " + this.retryTimer + " ms");
            setTimeout(() => {
              this.getFullMatchInfo(gameId, callback);
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