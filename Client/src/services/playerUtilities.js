class playerUtilities {

  constructor() {
  }

  getPlayerStatus(player) {
    return player.playing ? 'Playing' : 'Offline';
  }
  
}

module.exports = new playerUtilities();