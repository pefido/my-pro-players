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
    if(player.relevantSummoner && player.relevantSummoner.lastMatch) {
      if(!player.playing) {
        player.relevantSummoner.lastMatch.lastPlayed = this.getLastPlayed(player.lastGameEnd);
        player.relevantSummoner.lastPlayedSeconds = this.getLastPlayedSeconds(player.lastGameEnd);
        player.lastPlayed = this.getLastPlayed(player.lastGameEnd);
        player.lastPlayedSeconds = this.getLastPlayedSeconds(player.lastGameEnd);
      } else {
        player.relevantSummoner.lastPlayedSeconds = 0;
        player.lastPlayedSeconds = 0;
      }
    }
  }

  fillNotPlayingMessage(player) {
    if(!player.playerAccounts.length) {
      player.notPlayingMessage = "no summoners added to this player";
    } else if(!player.relevantSummoner) {
      player.notPlayingMessage = "no games found on record";
    } else {
      player.notPlayingMessage = "last played " + player.relevantSummoner.lastMatch.lastPlayed + " ago";
    }
  }

  getSpectateCommand(player, system) {
    var command = false;
    if (player.playing) {
      if (system === "mac") {
        command = 'cd /Applications/League\\ of\\ Legends.app/Contents/LoL/RADS/solutions/lol_game_client_sln/releases/ && cd $(ls -1vr -d */ | head -1) && cd deploy && chmod +x ./LeagueofLegends.app/Contents/MacOS/LeagueofLegends && riot_launched=true ./LeagueofLegends.app/Contents/MacOS/LeagueofLegends 8394 LoLLauncher "" "-Locale=en_US" "spectator spectator.euw1.lol.riotgames.com:80 ' + player.relevantSummoner.currentMatch.observers.encryptionKey + ' ' + player.relevantSummoner.currentMatch.gameId + ' EUW1"';
      } else {
        command = "some other command I need to find out";
      }
    }
    return command;
  };
  
}

module.exports = new playerUtilities();