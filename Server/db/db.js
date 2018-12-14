class DB {

  constructor() {
    this.summonerCollection = new Map();
    this.playersProfileCollection = new Map();
    this.userCollection = new Map();
    this.championsCollection = {};
    this.matchCollection = [];
    this.matchmakingQueues = [];


    //insert dunmy data
    this.summonerCollection.set(20717177, {
      id: 20717177,
      accountId: 23989840,
      name: 'Rekkles',
      playing: false,
      lastMatch: {
        fullMatch: {}
      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.summonerCollection.set(21081580, {
      id: 21081580,
      accountId: 0,
      name: 'Pefido',
      playing: false,
      lastMatch: {
        fullMatch: {}
      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.summonerCollection.set(23796520, {
      id: 23796520,
      accountId: 0,
      name: 'mithy',
      playing: false,
      lastMatch: {
        fullMatch: {}
      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.summonerCollection.set(95206795, {
      id: 95206795,
      accountId: 231084181,
      name: 'FNC Caps1',
      playing: false,
      lastMatch: {
        fullMatch: {}
      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.summonerCollection.set(73297023, {
      id: 73297023,
      accountId: 221657540,
      name: 'mithypote',
      playing: false,
      lastMatch: {
        fullMatch: {}
      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.summonerCollection.set(109537252, {
      id: 109537252,
      accountId: 241195068,
      name: 'G2 Perkz',
      playing: false,
      lastMatch: {
        fullMatch: {}
      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.summonerCollection.set(20110160, {
      id: 20110160,
      accountId: 23099233,
      name: 'TSM ZV3N',
      playing: false,
      lastMatch: {
        fullMatch: {}
      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.summonerCollection.set(21071845, {
      id: 21071845,
      accountId: 24467412,
      name: 'G2 Jerkz',
      playing: false,
      lastMatch: {
        fullMatch: {}
      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.summonerCollection.set(20308708, {
      id: 20308708,
      accountId: 23396278,
      name: 'G0DGILIUS',
      playing: false,
      lastMatch: {
        fullMatch: {}
      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.summonerCollection.set(22322085, {
      id: 22322085,
      accountId: 26164230,
      name: 'MSF Hansssama',
      playing: false,
      lastMatch: {
        fullMatch: {}
      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.summonerCollection.set(30657524, {
      id: 30657524,
      accountId: 34455333,
      name: 'MSF Febiven',
      playing: false,
      lastMatch: {
        fullMatch: {}
      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.summonerCollection.set(22136916, {
      id: 22136916,
      accountId: 25932954,
      name: 'kaSing 2018',
      playing: false,
      lastMatch: {
        fullMatch: {}
      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.summonerCollection.set(78387752, {
      id: 78387752,
      accountId: 223983687,
      name: 'HHAZMEMF',
      playing: false,
      lastMatch: {
        fullMatch: {}
      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.summonerCollection.set(20965425, {
      id: 20965425,
      accountId: 24328420,
      name: 'FNC Broxah',
      playing: false,
      lastMatch: {
        fullMatch: {}
      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });
    


    



    this.userCollection.set(1, {
      id: 1,
      username: 'pefido',
      settings: {
        system: 'mac'
      },
      followingPlayers: [20717177, 21081580, 23796520, 95206795, 73297023, 109537252, 20110160, 21071845, 20308708,
        22322085, 30657524, 22136916, 20965425]
    });
    this.userCollection.set(2, {
      id: 2,
      username: 'theTruckman',
      settings: {
        system: 'windows'
      },
      followingPlayers: [2]
    });






    this.playersProfileCollection.set(1, {
      id: 1,
      username: 'Rekkles',
      playerAccounts: [20717177, 78387752]
    });

    this.playersProfileCollection.set(2, {
      id: 2,
      username: 'Pefido',
      playerAccounts: [21081580]
    });

    this.playersProfileCollection.set(3, {
      id: 3,
      username: 'Mithy',
      playerAccounts: [23796520, 73297023]
    });

    this.playersProfileCollection.set(4, {
      id: 4,
      username: 'Caps',
      playerAccounts: [95206795]
    });

    this.playersProfileCollection.set(5, {
      id: 5,
      username: 'Perkz',
      playerAccounts: [109537252]
    });

    this.playersProfileCollection.set(6, {
      id: 6,
      username: 'Zven',
      playerAccounts: [20110160]
    });

    this.playersProfileCollection.set(7, {
      id: 7,
      username: 'Jankos',
      playerAccounts: [21071845]
    });

    this.playersProfileCollection.set(8, {
      id: 8,
      username: 'Gilius',
      playerAccounts: [20308708]
    });

    this.playersProfileCollection.set(9, {
      id: 9,
      username: 'Hans Sama',
      playerAccounts: [22322085]
    });

    this.playersProfileCollection.set(10, {
      id: 10,
      username: 'Febiven',
      playerAccounts: [30657524]
    });

    this.playersProfileCollection.set(11, {
      id: 11,
      username: 'kaSing',
      playerAccounts: [22136916]
    });
  }












  /////////user related operations
  getUser(id) {
    return new Promise((resolve, reject) => {
      var user = this.userCollection.get(parseInt(id));
      user ? resolve(user) : reject();
    });
  }

  addSummonerToUser(userId, summonerId) {
    return new Promise((resolve, reject) => {
      this.getUser(userId).then((user) => {
        if (!(user.followingPlayers.includes(parseInt(summonerId)))) {
          user.followingPlayers.push(parseInt(summonerId));
          this.userCollection.set(user.id, user);
          resolve(parseInt(summonerId));
        }
        reject();
      });
    });
  }

  removeSummonerFromUser(userId, summonerId) {
    return new Promise((resolve, reject) => {
      this.getUser(userId).then((user) => {
        if (user.followingPlayers.includes(parseInt(summonerId))) {
          user.followingPlayers = user.followingPlayers.filter((summoner) => {
            return summoner != parseInt(summonerId);
          });
          this.userCollection.set(user.id, user);
          resolve(user.followingPlayers);
        } else {
          reject();
        }
      });
    });
  }

  updateUserSettings(userId, settingsObj) {
    return new Promise((resolve, reject) => {
      return this.getUser(userId).then((user) => {
        user.settings.system = settingsObj.system;
        this.userCollection.set(user.id, user);
        resolve(user.settings);
      });
    });
  }


  /////////Summoner related operations

  getSummoner(id) {
    return new Promise((resolve, reject) => {
      var summoner = this.summonerCollection.get(parseInt(id));
      summoner ? resolve(summoner) : reject();
    });
  }

  getSummonerIdByUsername(username) {
    return new Promise((resolve, reject) => {
      var resSummoner = Array.from(this.summonerCollection.values()).find((summoner) => {
        return summoner.name === username;
      });
      resSummoner ? resolve(resSummoner.id) : reject();
    });
  }

  updateSummoner(summoner) {
    return new Promise((resolve, reject) => {
      return this.getSummoner(summoner.id).then((editingSummoner) => {
        editingSummoner.accountId = summoner.accountId;
        editingSummoner.name = summoner.name;
        editingSummoner.playing = false;
        editingSummoner.lastUpdated = summoner.lastUpdated;
        this.summonerCollection.set(editingSummoner.id, editingSummoner);
        resolve(editingSummoner);
      }).catch(() => {
        reject();
      });
    });
  }




  /////////player related operations
  getPlayer(id) {
    return new Promise((resolve, reject) => {
      var player = this.playerCollection.get(id);
      player ? resolve(player) : reject();
    });
  }

  updatePlayer() {
    return new Promise((resolve, reject) => {
      //still dunno what it does
    });
  }



  /////////Other
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