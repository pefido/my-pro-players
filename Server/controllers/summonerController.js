const riotAPI = require('../services/riotAPI');

class summonerController {
  constructor(db) {
    this.db = db;
  }

  updateSummonerInfo(dbSummoner, currentTime) {
    return new Promise((resolve, reject) => {
      riotAPI.getSummonerInfo(dbSummoner.id).then((newSummoner) => {
        newSummoner.lastUpdated = currentTime;
        return this.db.updateSummoner(newSummoner);
      }).then((savedSummoner) => {
        return riotAPI.getSpectatorInfo(savedSummoner.id).then((spectatorInfo) => {
          savedSummoner.playing = (spectatorInfo != undefined);
          if (!savedSummoner.playing) {
            return riotAPI.getLastMatchInfo(savedSummoner.accountId).then((lastMatch) => {
              if (lastMatch.gameId != savedSummoner.lastMatch.gameId) {
                console.log("game not cached, fetching");
                return riotAPI.getFullMatchInfo(lastMatch.gameId).then((fullMatch) => {
                  lastMatch.fullMatch = fullMatch;
                  savedSummoner.lastMatch = lastMatch;
                  return savedSummoner;
                });
              } else {
                console.log("game cached");
                return savedSummoner;
              }
            });
          } else {
            console.log("is playing");
            savedSummoner.currentMatch = spectatorInfo;
            var participant = savedSummoner.currentMatch.participants.find((summoner) => {
              return summoner.summonerId === savedSummoner.id;
            });
            savedSummoner.currentMatch.playingChampion = this.db.getChampionNameById(participant.championId);
            savedSummoner.currentMatch.playingQueue = this.db.getQueueById(savedSummoner.currentMatch.gameQueueConfigId);
            return savedSummoner;
          }
        });
      }).then((savedSummoner) => {
        resolve(savedSummoner);
      });
    });
  }

  getSummoner(id) {
    return new Promise((resolve, reject) => {
      this.db.getSummoner(id).then((dbSummoner) => {
        if (dbSummoner != undefined) {
          var currentTime = new Date();
          var lastDate = new Date(dbSummoner.lastUpdated);
          //update summoner if it is older than 30 seconds
          if ((currentTime - lastDate) / 1000 < 30) {
            console.log("summoner cached");
            resolve(dbSummoner);
          } else {
            console.log("summoner not cached, fetching");
            this.updateSummonerInfo(dbSummoner, currentTime).then((savedSummoner) => {
              resolve(savedSummoner);
            });
          }
        } else {
          reject();
        }
      });
    });
  }

  getSummonersParallel(summonerCollection, callback) {
    if (summonerCollection.length) {
      var countSummoners = summonerCollection.length;
      summonerCollection.forEach((id) => {
        this.getSummoner(id).then((resSummoner) => {
          callback(resSummoner);
          countSummoners--;
          console.log(countSummoners + " summoners left");
          if (countSummoners === 0) {
            callback(false);
          }
        });
      });

    } else {
      callback(false);
    }
  }

  getSummonersSequential(summonerCollection, callback) {
    if (summonerCollection.length > 0) {
      this.getSummoner(summonerCollection[0]).then((resSummoner) => {
        callback(resSummoner);
        var newCollection = summonerCollection.slice();
        newCollection.shift();
        this.getSummonersSequential(newCollection, callback);
      });
    } else {
      callback(false);
    }
  }

}

module.exports = summonerController;