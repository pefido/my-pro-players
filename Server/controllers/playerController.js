const riotAPI = require('../services/riotAPI');

class playerController {
  constructor(db) {
    this.db = db;
  }

  updatePlayerInfo(dbPlayer, currentTime) {
    return new Promise((resolve, reject) => {
      riotAPI.getPlayerInfo(dbPlayer.id).then((newPlayer) => {
        newPlayer.lastUpdated = currentTime;
        return this.db.updatePlayer(newPlayer);
      }).then((savedPlayer) => {
        return riotAPI.getSpectatorInfo(savedPlayer.id).then((spectatorInfo) => {
          savedPlayer.playing = (spectatorInfo != undefined);
          if (!savedPlayer.playing) {
            return riotAPI.getLastMatchInfo(savedPlayer.accountId).then((lastMatch) => {
              if (lastMatch.gameId != savedPlayer.lastMatch.gameId) {
                console.log("game not cached, fetching");
                return riotAPI.getFullMatchInfo(lastMatch.gameId).then((fullMatch) => {
                  lastMatch.fullMatch = fullMatch;
                  savedPlayer.lastMatch = lastMatch;
                  return savedPlayer;
                });
              } else {
                console.log("game cached");
                return savedPlayer;
              }
            });
          } else {
            console.log("is playing");
            savedPlayer.currentMatch = spectatorInfo;
            var participant = savedPlayer.currentMatch.participants.find((player) => {
              return player.summonerId === savedPlayer.id;
            });
            savedPlayer.currentMatch.playingChampion = this.db.getChampionNameById(participant.championId);
            savedPlayer.currentMatch.playingQueue = this.db.getQueueById(savedPlayer.currentMatch.gameQueueConfigId);
            return savedPlayer;
          }
        });
      }).then((savedPlayer) => {
        resolve(savedPlayer);
      });
    });
  }

  getPlayer(id) {
    return new Promise((resolve, reject) => {
      var dbPlayer = this.db.getPlayer(id);

      if (dbPlayer != undefined) {
        var currentTime = new Date();
        var lastDate = new Date(dbPlayer.lastUpdated);
        //update player if it is older than 30 seconds
        if ((currentTime - lastDate) / 1000 < 30) {
          console.log("player cached");
          resolve(dbPlayer);
        } else {
          console.log("player not cached, fetching");
          this.updatePlayerInfo(dbPlayer, currentTime).then((savedPlayer) => {
            resolve(savedPlayer);
          });
        }
      } else {
        reject();
      }
    });
  }

  getPlayersParallel(playerCollection, callback) {
    if (playerCollection.length) {
      var countPlayers = playerCollection.length;
      playerCollection.forEach((id) => {
        this.getPlayer(id).then((resPlayer) => {
          callback(resPlayer);
          countPlayers--;
          if (countPlayers === 0) {
            callback(false);
          }
        });
      });

    } else {
      callback(false);
    }
  }

  getPlayersSequential(playerCollection, callback) {
    if (playerCollection.length > 0) {
      this.getPlayer(playerCollection[0]).then((resPlayer) => {
        callback(resPlayer);
        var newCollection = playerCollection.slice();
        newCollection.shift();
        this.getPlayersSequential(newCollection, callback);
      });
    } else {
      callback(false);
    }
  }

}

module.exports = playerController;