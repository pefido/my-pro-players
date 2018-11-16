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

    this.playersCollection.set(23796520, {
      id: 23796520,
      name: 'mithy',
      playing: false,
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.usersCollection.set(1, {
      id: 1,
      username: 'pefido',
      followingPlayers: [20717177, 21081580]
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

  addPlayerToUser(userId, playerId) {
    var user = this.getUser(userId);
    var res = false;
    if(!(user.followingPlayers.includes(parseInt(playerId))) ) {
      user.followingPlayers.push(parseInt(playerId));
      this.usersCollection.set(user.id, user);
      res = true;
    }
    return res;
  }

  removePlayerFromUser(userId, playerId, callback) {
    var user = this.getUser(userId);
    var newPlayerCollection = undefined;
    if(user.followingPlayers.includes(parseInt(playerId)) ) {
      user.followingPlayers = user.followingPlayers.filter((player) => {
        return player != parseInt(playerId);
      });
      this.usersCollection.set(user.id, user);
      newPlayerCollection = user.followingPlayers;
    }
    callback(newPlayerCollection);
  }


  /////////player related operations

  getPlayers(players, callback) {
    var followingPlayers = Array.from(this.playersCollection.values());
    if(players.length){
      followingPlayers = followingPlayers.filter((player) => {
        return players.includes(player.id);
      });
    }
    callback(followingPlayers);
  }

  getPlayer(id) {
    return this.playersCollection.get(parseInt(id));
  }

  getPlayerIdByUsername(username) {
    var resPlayer = Array.from(this.playersCollection.values()).find((player) => {
      return player.name === username;
    });
    if(resPlayer){
      return resPlayer.id;
    } else {
      return undefined;
    }
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