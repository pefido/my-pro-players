const riotAPI = require('../services/riotAPI');

class playerController {
  constructor(db){
    this.db = db;
  }

  updatePlayerInfo(dbPlayer, currentTime, callback) {
    riotAPI.getPlayerInfo(dbPlayer.id, (newPlayer) => {
      newPlayer.lastUpdated = currentTime;
      this.db.updatePlayer(newPlayer, (savedPlayer) => {
        riotAPI.getSpectatorInfo(savedPlayer.id, (spectatorInfo) => {
          savedPlayer.playing = (spectatorInfo != undefined);
          if(!savedPlayer.playing) {
            riotAPI.getLastMatchInfo(savedPlayer.accountId, (lastMatch) => {
              savedPlayer.lastMatch = lastMatch;
              callback(savedPlayer);
            });
          } else {
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
         callback(dbPlayer);
      } else {
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
    if(playerCollection.length){
      var countPlayers = playerCollection.length;
      playerCollection.forEach( (id) => {
        this.getPlayer(id, (resPlayer) => {
          resPlayers.push(resPlayer);
          countPlayers--;
          if(countPlayers === 0) {
            callback(resPlayers);
          }
        });
      });

    } else {
      callback(resPlayers);
    }
  }
  
}

module.exports = playerController;