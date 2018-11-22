const riotAPI = require('../services/riotAPI');


class ServerUtilities {

  constructor(db) {
    this.db = db;

    //populate database with static lol info
    riotAPI.getChampionsListing((ChampionsListing) => {
      db.championsCollection = ChampionsListing;
      for (var champion in db.championsCollection) {
        db.championsCollection[db.championsCollection[champion].key] = db.championsCollection[champion];
        delete db.championsCollection[champion];
      }
    });

  }


}

module.exports = ServerUtilities;