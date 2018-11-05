const riotAPI = require('../services/riotAPI');

class playerController {
  constructor(db){
    this.db = db;
  }

  updatePlayerInfo(dbPlayer, currentTime, callback){
    riotAPI.getPlayerInfo(dbPlayer.id, (newPlayer) => {
      newPlayer.lastUpdated = currentTime;
      this.db.updatePlayer(newPlayer, (savedPlayer) => {
        riotAPI.getSpectatorInfo(savedPlayer.id, (spectatorInfo) => {
          savedPlayer.playing = (spectatorInfo != undefined);
          callback(savedPlayer);
        });
      });
    });
  }
  
}

module.exports = playerController;