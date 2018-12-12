const riotAPI = require('../services/riotAPI');
const fs = require('fs');


class ServerUtilities {

  constructor(db) {
    this.db = db;

    //populate database with static lol info
    riotAPI.getChampionsListing().then((ChampionsListing) => {
      db.championsCollection = ChampionsListing;
      for (var champion in db.championsCollection) {
        db.championsCollection[db.championsCollection[champion].key] = db.championsCollection[champion];
        delete db.championsCollection[champion];
      }
    });

    db.matchmakingQueues = JSON.parse(fs.readFileSync('./db/gameConstants.json')).matchmakingQueues;

  }


}

module.exports = ServerUtilities;