const riotAPI = require('../services/riotAPI');

class playerController {
  constructor(db) {
    this.db = db;
  }

  updatePlayerInfo(dbPlayer, currentTime, callback) {
    riotAPI.getPlayerInfo(dbPlayer.id, (newPlayer) => {
      newPlayer.lastUpdated = currentTime;
      this.db.updatePlayer(newPlayer, (savedPlayer) => {
        riotAPI.getSpectatorInfo(savedPlayer.id, (spectatorInfo) => {
          savedPlayer.playing = (spectatorInfo != undefined);
          if (!savedPlayer.playing) {
            riotAPI.getLastMatchInfo(savedPlayer.accountId, (lastMatch) => {
              
              if(lastMatch.gameId != savedPlayer.lastMatch.gameId)  {
                console.log("game not cached, fetching");
                riotAPI.getFullMatchInfo(lastMatch.gameId, (fullMatch) => {
                  lastMatch.fullMatch = fullMatch;
                  savedPlayer.lastMatch = lastMatch;
                  callback(savedPlayer);
                });
              } else {
                console.log("game cached");
                callback(savedPlayer);
              }
            });
          } else {
            savedPlayer.currentMatch = spectatorInfo;
            var participant = savedPlayer.currentMatch.participants.find((player) => {
              return player.summonerId === savedPlayer.id;
            });
            savedPlayer.currentMatch.playingChampion = this.db.getChampionNameById(participant.championId);
            savedPlayer.currentMatch.playingQueue = this.db.getQueueById(savedPlayer.currentMatch.gameQueueConfigId);
            callback(savedPlayer);
          }
        });
      });
    });
  }

  getPlayer(id, callback) {
    var resPlayer = undefined;
    var dbPlayer = this.db.getPlayer(id);

    if (dbPlayer != undefined) {
      var currentTime = new Date();
      var lastDate = new Date(dbPlayer.lastUpdated);
      //update player if it is older than 30 seconds
      if ((currentTime - lastDate) / 1000 < 30) {
        console.log("player cached");
        callback(dbPlayer);
      } else {
        console.log("player not cached, fetching");
        this.updatePlayerInfo(dbPlayer, currentTime, (savedPlayer) => {
          callback(savedPlayer);
        });
      }
    } else {
      callback(resPlayer);
    }
  }

  getPlayersParallel(playerCollection, callback) {
    if (playerCollection.length) {
      var countPlayers = playerCollection.length;
      playerCollection.forEach((id) => {
        this.getPlayer(id, (resPlayer) => {
          callback(resPlayer);
          countPlayers--;
          if(countPlayers === 0) {
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
      this.getPlayer(playerCollection[0], (resPlayer) => {
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