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

                riotAPI.getFullMatchInfo(lastMatch.gameId, (fullMatch) => {
                  lastMatch.fullMatch = fullMatch;
                  lastMatch.lastPlayed = this.getLastPlayed(lastMatch.timestamp, fullMatch.gameDuration);
                  savedPlayer.lastPlayedSeconds = this.getLastPlayedSeconds(lastMatch.timestamp, fullMatch.gameDuration);
                  savedPlayer.lastMatch = lastMatch;
                  callback(savedPlayer);
                });
              } else {
                callback(savedPlayer);
              }
            });
          } else {
            savedPlayer.lastPlayedSeconds = 0;
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
        console.log("was cached");
        callback(dbPlayer);
      } else {
        console.log("not cached, fetching");
        this.updatePlayerInfo(dbPlayer, currentTime, (savedPlayer) => {
          callback(savedPlayer);
        });
      }
    } else {
      callback(resPlayer);
    }
  }

  getPlayers(playerCollection, callback) {
    var resPlayers = [];
    if (playerCollection.length) {
      var countPlayers = playerCollection.length;
      playerCollection.forEach((id) => {
        this.getPlayer(id, (resPlayer) => {
          resPlayers.push(resPlayer);
          countPlayers--;
          if (countPlayers === 0) {
            callback(resPlayers);
          }
        });
      });

    } else {
      callback(resPlayers);
    }
  }

  getLastPlayedSeconds(gameCreation, gameDuration) {
    var timestamp = gameCreation + (gameDuration * 1000) - (1000 * 60);
    var seconds = (((new Date) - timestamp) / 1000);
    return seconds;
  }

  getLastPlayed(gameCreation, gameDuration) {
    var lastPlayed = "";
    var seconds = this.getLastPlayedSeconds(gameCreation, gameDuration);

    seconds >= 60 * 2 && seconds < 3600 * 2 ? lastPlayed = Math.round(seconds / 60) + " minutes" :
      seconds >= 3600 * 2 && seconds < 86400 * 2 ? lastPlayed = Math.round((seconds / 60) / 60) + " hours" :
        seconds >= 86400 * 2 && seconds < 604800 * 2 ? lastPlayed = Math.round(((seconds / 60) / 60) / 24) + " days" :
          seconds >= 604800 * 2 && seconds < 2592000 * 2 ? lastPlayed = Math.round((((seconds / 60) / 60) / 24) / 7) + " weeks" :
            seconds > 2592000 * 2 && seconds < 31536000 * 2 ? lastPlayed = Math.round((((seconds / 60) / 60) / 24) / 12) + " months" :
              seconds > 31536000 * 2 ? lastPlayed = Math.round((((seconds / 60) / 60) / 24) / 362) + " years" :
                lastPlayed = Math.round(seconds) + " seconds";

    return lastPlayed;
  }

}

module.exports = playerController;