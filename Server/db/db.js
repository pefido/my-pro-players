class DB {

  constructor() {
    this.playersCollection = new Map();
    this.usersCollection = new Map();


    //insert dunmy data
    this.playersCollection.set(20717177, {
      id: 20717177,
      name: 'Rekkles',
      playing: false,
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.playersCollection.set(21081580, {
      id: 21081580,
      name: 'Pefido',
      playing: false,
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.usersCollection.set(1, {
      id: 1,
      username: 'pefido',
      followingPlayers: [20717177]
    });
    this.usersCollection.set(2, {
      id: 2,
      username: 'theTruckman',
      followingPlayers: []
    });
  }

  /////////user related operations
  getUser(id) {
    return this.usersCollection.get(parseInt(id));
  }



  /////////player related operations

  getPlayers(players, callback) {
    var followingPlayers = Array.from(this.playersCollection.values());
    if(players){
      followingPlayers = followingPlayers.filter((player) => {
        return players.includes(player.id);
      });
    }
    callback(followingPlayers);
  }

  getPlayer(id) {
    return this.playersCollection.get(parseInt(id));
  }

  updatePlayer(player, callback) {
    var editingPlayer = this.getPlayer(player.id);
    editingPlayer.name = player.name;
    editingPlayer.playing = false;
    editingPlayer.lastUpdated = player.lastUpdated;
    this.playersCollection.set(editingPlayer.id, editingPlayer);
    callback(editingPlayer);
  }

}

module.exports = new DB();