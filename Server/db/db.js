class DB {

  constructor() {
    this.playersCollection = new Map();
    this.usersCollection = new Map();
    this.championsCollection = {};
    this.matchmakingQueues = [];


    //insert dunmy data
    this.playersCollection.set(20717177, {
      id: 20717177,
      accountId: 23989840,
      name: 'Rekkles',
      playing: false,
      lastMatch: {
        lane: "MID",
        gameId: 3829300875,
        champion: 15,
        platformId: "EUW1",
        timestamp: 1542012837696,
        queue: 420,
        role: "DUO",
        season: 11
      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.playersCollection.set(21081580, {
      id: 21081580,
      accountId: 0,
      name: 'Pefido',
      playing: false,
      lastMatch: {
        lane: "MID",
        gameId: 3829300875,
        champion: 15,
        platformId: "EUW1",
        timestamp: 1542012837696,
        queue: 420,
        role: "DUO",
        season: 11
      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.playersCollection.set(23796520, {
      id: 23796520,
      accountId: 0,
      name: 'mithy',
      playing: false,
      lastMatch: {
        lane: "MID",
        gameId: 3829300875,
        champion: 15,
        platformId: "EUW1",
        timestamp: 1542012837696,
        queue: 420,
        role: "DUO",
        season: 11
      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.playersCollection.set(95206795, {
      id: 95206795,
      accountId: 231084181,
      name: 'FNC Caps1',
      playing: false,
      lastMatch: {

      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.playersCollection.set(73297023, {
      id: 73297023,
      accountId: 221657540,
      name: 'mithypote',
      playing: false,
      lastMatch: {
        
      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.playersCollection.set(109537252, {
      id: 109537252,
      accountId: 241195068,
      name: 'G2 Perkz',
      playing: false,
      lastMatch: {
        
      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.playersCollection.set(20110160, {
      id: 20110160,
      accountId: 23099233,
      name: 'TSM ZV3N',
      playing: false,
      lastMatch: {
        
      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.playersCollection.set(21071845, {
      id: 21071845,
      accountId: 24467412,
      name: 'G2 Jerkz',
      playing: false,
      lastMatch: {
        
      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.usersCollection.set(1, {
      id: 1,
      username: 'pefido',
      followingPlayers: [20717177, 21081580, 23796520, 95206795, 73297023, 109537252, 20110160, 21071845]
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
    if (!(user.followingPlayers.includes(parseInt(playerId)))) {
      user.followingPlayers.push(parseInt(playerId));
      this.usersCollection.set(user.id, user);
      res = true;
    }
    return res;
  }

  removePlayerFromUser(userId, playerId, callback) {
    var user = this.getUser(userId);
    var newPlayerCollection = undefined;
    if (user.followingPlayers.includes(parseInt(playerId))) {
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
    if (players.length) {
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
    if (resPlayer) {
      return resPlayer.id;
    } else {
      return undefined;
    }
  }

  updatePlayer(player, callback) {
    var editingPlayer = this.getPlayer(player.id);
    editingPlayer.accountId = player.accountId;
    editingPlayer.name = player.name;
    editingPlayer.playing = false;
    editingPlayer.lastUpdated = player.lastUpdated;
    this.playersCollection.set(editingPlayer.id, editingPlayer);
    callback(editingPlayer);
  }

  getChampionNameById(id) {
    return this.championsCollection[id];
  }

  getQueueById(queueId) {
    return this.matchmakingQueues.find((queue) => {
      return queue.id === queueId;
    });
  }

}

module.exports = new DB();