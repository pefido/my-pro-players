class summonerUtilities {

  constructor() {
  }

  getSummonerStatus(summoner) {
    return summoner.playing ? 'Playing' : 'Offline';
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

  fillLastPlayed(summoner) {
    if(summoner && summoner.lastMatch) {
      if(!summoner.playing) {
        summoner.lastMatch.lastPlayed = this.getLastPlayed(summoner.lastGameEnd);
        summoner.lastPlayedSeconds = this.getLastPlayedSeconds(summoner.lastGameEnd);
      } else {
        summoner.lastPlayedSeconds = 0;
      }
    }
  }

  fillNotPlayingMessage(summoner) {
    if(!summoner.lastMatch.gameId) {
      summoner.notPlayingMessage = "no games found on record";
    } else {
      summoner.notPlayingMessage = "last played " + summoner.lastMatch.lastPlayed + " ago";
    }
  }

  getSpectateCommand(summoner, system) {
    var command = false;
    if (summoner.playing) {
      if (system === "mac") {
        command = 'cd /Applications/League\\ of\\ Legends.app/Contents/LoL/RADS/solutions/lol_game_client_sln/releases/ && cd $(ls -1vr -d */ | head -1) && cd deploy && chmod +x ./LeagueofLegends.app/Contents/MacOS/LeagueofLegends && riot_launched=true ./LeagueofLegends.app/Contents/MacOS/LeagueofLegends 8394 LoLLauncher "" "-Locale=en_US" "spectator spectator.euw1.lol.riotgames.com:80 ' + summoner.currentMatch.observers.encryptionKey + ' ' + summoner.currentMatch.gameId + ' EUW1"';
      } else {
        command = "some other command I need to find out";
      }
    }
    return command;
  };
  
}

module.exports = new summonerUtilities();