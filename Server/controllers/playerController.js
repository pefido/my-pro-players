class playerController {
  constructor(summonerController, db) {
    this.summonerController = summonerController;
    this.db = db;
  }

  getPlayersParallel(playerCollection, callback) {
    if(playerCollection.length) {
      var countPlayers = playerCollection.length;
      playerCollection.forEach((id) => {
        this.getPlayer(id).then((resPlayer) => {
          callback(resPlayer);
          countPlayers--;
          console.log(countPlayers + " players left");
          if(countPlayers === 0) {
            callback(false);
          }
        })
      })
    } else {
      callback(false);
    }
  }

  getPlayer(id) {
    return new Promise((resolve, reject) => {
      this.db.getPlayer(id).then((dbPlayer) => {
        var currentTime = new Date();
        var lastDate = new Date(dbPlayer.lastUpdated);
        //update Player if it is older than 30 seconds or playing for less than 15 minutes
        if ((currentTime - lastDate) / 1000 < 30 || !this.summonerController.canFF15(dbPlayer.playing, dbPlayer.lastGameStart, currentTime)) {
          console.log("player cached");
          resolve(dbPlayer);
        } else {
          console.log("player not cached, fetching");
          this.updatePlayerInfo(dbPlayer).then((savedPlayer) => {
            resolve(savedPlayer);
          });
        }
      }).catch(() => {
        reject();
      });
    });
  }

  getPlayerByUsername(username) {
    return new Promise((resolve, reject) => {
      this.db.getPlayerIdByUsername(username).then((playerId) => {
        return this.getPlayer(playerId);
      }).catch(() => {
        reject();
      }).then((player) => {
          resolve(player);
      });
    })
  }

  updatePlayerInfo(dbPlayer) {
    return new Promise((resolve, reject) => {
      var end = false;
      var playing = false;
      var lastGameStart = 0;
      var lastGameEnd = 0;
      var matchType = undefined;
      var playingChampion = undefined;
      var relevantSummoner = undefined;
      this.summonerController.getSummonersParallel(dbPlayer.playerAccounts, (summoner) => {
        if(summoner) {
          if(summoner.playing) {
            playing = summoner.playing;
            lastGameStart = summoner.currentMatch.gameStartTime;
            matchType = summoner.currentMatch.playingQueue.shortName || summoner.currentMatch.playingQueue.name;
            playingChampion = summoner.currentMatch.playingChampion.name;
            relevantSummoner = summoner;
            end = true;
          } else if(summoner.lastGameEnd > lastGameEnd) {
            lastGameEnd = summoner.lastGameEnd;
            lastGameStart = summoner.lastMatch.timestamp;
            relevantSummoner = summoner;
          }
        } else {
          end = true;
        }
        if(end) {
          dbPlayer.playing = playing;
          dbPlayer.lastGameEnd = lastGameEnd;
          dbPlayer.lastGameStart = lastGameStart;
          dbPlayer.matchType = matchType;
          dbPlayer.playingChampion = playingChampion;
          dbPlayer.relevantSummoner = relevantSummoner;
          dbPlayer.lastUpdated = new Date();
          this.db.updatePlayer(dbPlayer).then((savedPlayer) => {
            resolve(savedPlayer);
          });
        }
      });
    });
  }


}

module.exports = playerController;