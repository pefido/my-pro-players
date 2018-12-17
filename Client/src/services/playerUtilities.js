class playerUtilities {

  constructor() {
  }

  getPlayerStatus(player) {
    return player.playing ? 'Playing' : 'Offline';
  }

  // getLastPlayedSeconds(gameCreation, gameDuration) {
  //   var timestamp = gameCreation + (gameDuration * 1000) - (1000 * 60);
  //   var seconds = (((new Date) - timestamp) / 1000);
  //   return seconds;
  // }

  getLastPlayedSeconds(lastGameEnd) {
    var timestamp = lastGameEnd - (1000 * 60);
    var seconds = (((new Date) - timestamp) / 1000);
    return seconds;
  }

  getLastPlayed(lastGameEnd) {
    var lastPlayed = "";
    var seconds = this.getLastPlayedSeconds(lastGameEnd);

    seconds >= 60 * 2 && seconds < 3600 * 2 ? lastPlayed = Math.round(seconds / 60) + " minutes" :
      seconds >= 3600 * 2 && seconds < 86400 * 2 ? lastPlayed = Math.round((seconds / 60) / 60) + " hours" :
        seconds >= 86400 * 2 && seconds < 604800 * 2 ? lastPlayed = Math.round(((seconds / 60) / 60) / 24) + " days" :
          seconds >= 604800 * 2 && seconds < 2592000 * 2 ? lastPlayed = Math.round((((seconds / 60) / 60) / 24) / 7) + " weeks" :
            seconds > 2592000 * 2 && seconds < 31536000 * 2 ? lastPlayed = Math.round((((seconds / 60) / 60) / 24) / 12) + " months" :
              seconds > 31536000 * 2 ? lastPlayed = Math.round((((seconds / 60) / 60) / 24) / 362) + " years" :
                lastPlayed = Math.round(seconds) + " seconds";

    return lastPlayed;
  }

  fillLastPlayed(player) {
    if(!player.playing) {
      player.relevantSummoner.lastMatch.lastPlayed = this.getLastPlayed(player.lastGameEnd);
      player.relevantSummoner.lastPlayedSeconds = this.getLastPlayedSeconds(player.lastGameEnd);
    } else {
      player.relevantSummoner.lastPlayedSeconds = 0;
    }
  }
  
}

module.exports = new playerUtilities();