class DB {

  constructor() {
    this.summonerCollection = new Map();
    this.playerCollection = new Map();
    this.userCollection = new Map();
    this.championsCollection = {};
    this.matchCollection = [];
    this.matchmakingQueues = [];


    //insert dummy data
    this.summonerCollection.set(20717177, {
      entityType: 'summoner',
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
      entityType: 'summoner',
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
      entityType: 'summoner',
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
      entityType: 'summoner',
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
      entityType: 'summoner',
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
      entityType: 'summoner',
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
      entityType: 'summoner',
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
      entityType: 'summoner',
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
      entityType: 'summoner',
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
      entityType: 'summoner',
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
      entityType: 'summoner',
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
      entityType: 'summoner',
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
      entityType: 'summoner',
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
      entityType: 'summoner',
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

    this.summonerCollection.set(22493694, {
      entityType: 'summoner',
      id: 22493694,
      accountId: 26410658,
      name: 'TOP de nota 10',
      playing: false,
      lastMatch: {
        fullMatch: {}
      },
      currentMatch: {

      },
      lastUpdated: '2018-11-02T16:22:05.639Z'
    });

    this.summonerCollection.set(19751358, {
      entityType: 'summoner',
      id: 19751358,
      accountId: 22602333,
      name: 'Kikis',
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
      followingPlayers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    });
    this.userCollection.set(2, {
      id: 2,
      username: 'theTruckman',
      settings: {
        system: 'windows'
      },
      followingPlayers: [3]
    });






    this.playerCollection.set(1, {
      entityType: 'player',
      id: 1,
      firstName: 'Martin',
      lastName: 'Larsson',
      nationality: 'Swedish',
      infoBoard:
        {
          role: ['Role', 'AD Carry'],
          team: ['Team', 'Fnatic'],
          playsIn: ['League', 'EU LCS'],
        },
      name: 'Rekkles',
      lastUpdated: '2018-11-02T16:22:05.639Z',
      relevantSummoner: 20717177,
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: [20717177, 78387752]
    });

    this.playerCollection.set(2, {
      entityType: 'player',
      id: 2,
      firstName: 'Pedro',
      lastName: 'Durães',
      nationality: 'Portuguese',
      infoBoard:
        {
          role: ['Role', 'AD Carry'],
          team: ['Team', 'MafAld'],
          playsIn: ['League', 'EU LCS'],
        },
      name: 'Pefido',
      lastUpdated: '2018-11-02T16:22:05.639Z',
      relevantSummoner: 21081580,
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: [21081580]
    });

    this.playerCollection.set(3, {
      entityType: 'player',
      id: 3,
      firstName: 'Alfonso',
      lastName: 'Aguirre',
      nationality: 'Spanish',
      infoBoard:
        {
          role: ['Role', 'Support'],
          team: ['Team', 'Origen'],
          playsIn: ['League', 'EU LCS'],
        },
      name: 'Mithy',
      lastUpdated: '2018-11-02T16:22:05.639Z',
      relevantSummoner: 23796520,
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: [73297023, 23796520]
    });

    this.playerCollection.set(4, {
      entityType: 'player',
      id: 4,
      firstName: 'Rasmus',
      lastName: 'Winther',
      nationality: 'Danish',
      infoBoard:
        {
          role: ['Role', 'Mid'],
          team: ['Team', 'G2 Esports'],
          playsIn: ['League', 'EU LCS'],
        },
      name: 'Caps',
      lastUpdated: '2018-11-02T16:22:05.639Z',
      relevantSummoner: 95206795,
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: [95206795]
    });

    this.playerCollection.set(5, {
      entityType: 'player',
      id: 5,
      firstName: 'Luka',
      lastName: 'Perković',
      nationality: 'Croatia',
      infoBoard:
        {
          role: ['Role', 'AD Carry'],
          team: ['Team', 'G2 Esports'],
          playsIn: ['League', 'EU LCS'],
        },
      name: 'Perkz',
      lastUpdated: '2018-11-02T16:22:05.639Z',
      relevantSummoner: 109537252,
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: [109537252]
    });

    this.playerCollection.set(6, {
      entityType: 'player',
      id: 6,
      firstName: 'Jesper',
      lastName: 'Svenningsen',
      nationality: 'Danish',
      infoBoard:
        {
          role: ['Role', 'AD Carry'],
          team: ['Team', 'Team SoloMid'],
          playsIn: ['League', 'NA LCS'],
        },
      name: 'Zven',
      lastUpdated: '2018-11-02T16:22:05.639Z',
      relevantSummoner: 20110160,
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: [20110160]
    });

    this.playerCollection.set(7, {
      entityType: 'player',
      id: 7,
      firstName: 'Marcin',
      lastName: 'Jankowski',
      nationality: 'Polish',
      infoBoard:
        {
          role: ['Role', 'Jungler'],
          team: ['Team', 'G2 Esports'],
          playsIn: ['League', 'EU LCS'],
        },
      name: 'Jankos',
      lastUpdated: '2018-11-02T16:22:05.639Z',
      relevantSummoner: 21071845,
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: [21071845]
    });

    this.playerCollection.set(8, {
      entityType: 'player',
      id: 8,
      firstName: 'Berk',
      lastName: 'Demir',
      nationality: 'German',
      infoBoard:
        {
          role: ['Role', 'Jungler'],
          team: ['Team', 'Beşiktaş e-Sports Club'],
          playsIn: ['League', 'TCL'],
        },
      name: 'Gilius',
      lastUpdated: '2018-11-02T16:22:05.639Z',
      relevantSummoner: 20308708,
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: [20308708]
    });

    this.playerCollection.set(9, {
      entityType: 'player',
      id: 9,
      firstName: 'Steven',
      lastName: 'Liv',
      nationality: 'French',
      infoBoard:
        {
          role: ['Role', 'AD Carry'],
          team: ['Team', 'Misfits Gaming'],
          playsIn: ['League', 'EU LCS'],
        },
      name: 'Hans Sama',
      lastUpdated: '2018-11-02T16:22:05.639Z',
      relevantSummoner: 22322085,
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: [22322085]
    });

    this.playerCollection.set(10, {
      entityType: 'player',
      id: 10,
      firstName: 'Fabian',
      lastName: 'Diepstraten',
      nationality: 'Dutch',
      infoBoard:
        {
          role: ['Role', 'Mid'],
          team: ['Team', 'Misfits Gaming'],
          playsIn: ['League', 'EU LCS'],
        },
      name: 'Febiven',
      lastUpdated: '2018-11-02T16:22:05.639Z',
      relevantSummoner: 30657524,
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: [30657524]
    });

    this.playerCollection.set(11, {
      entityType: 'player',
      id: 11,
      firstName: 'Raymond',
      lastName: 'Tsang',
      nationality: 'United Kingdom',
      infoBoard:
        {
          role: ['Role', 'Support'],
          team: ['Team', 'exceL Esports'],
          playsIn: ['League', 'EU LCS'],
        },
      name: 'kaSing',
      lastUpdated: '2018-11-02T16:22:05.639Z',
      relevantSummoner: 22136916,
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: [22136916]
    });

    this.playerCollection.set(12, {
      entityType: 'player',
      id: 12,
      firstName: 'Alexandre',
      lastName: 'Rodrigues',
      nationality: 'Portuguese',
      infoBoard:
        {
          role: ['Role', 'TOP'],
          team: ['Team', 'K1CK eSports Club'],
          playsIn: ['League', 'LPLOL'],
        },
      name: 'Truklax',
      lastUpdated: '2018-11-02T16:22:05.639Z',
      relevantSummoner: 20717177,
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: [22493694]
    });

    this.playerCollection.set(13, {
      entityType: 'player',
      id: 13,
      firstName: 'Mateusz',
      lastName: 'Szkudlarek',
      nationality: 'Polish',
      infoBoard:
        {
          role: ['Role', 'Jungler'],
          team: ['Team', 'Rogue'],
          playsIn: ['League', 'EU LCS'],
        },
      name: 'Kikis',
      lastUpdated: '2018-11-02T16:22:05.639Z',
      relevantSummoner: 19751358,
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: [19751358]
    });


  }












  /////////user related operations
  getUser(id) {
    return new Promise((resolve, reject) => {
      var user = this.userCollection.get(parseInt(id));
      user ? resolve(user) : reject();
    });
  }

  addPlayerToUser(userId, playerId) {
    return new Promise((resolve, reject) => {
      this.getUser(userId).then((user) => {
        if (!(user.followingPlayers.includes(parseInt(playerId)))) {
          user.followingPlayers.push(parseInt(playerId));
          this.userCollection.set(user.id, user);
          resolve(parseInt(playerId));
        } else {
          reject();
        }
      });
    });
  }

  removePlayerFromUser(userId, playerId) {
    return new Promise((resolve, reject) => {
      this.getUser(userId).then((user) => {
        if (user.followingPlayers.includes(parseInt(playerId))) {
          user.followingPlayers = user.followingPlayers.filter((player) => {
            return player != parseInt(playerId);
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
      this.getSummoner(summoner.id).then((editingSummoner) => {
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

  addSummonerToPlayer(playerId, summonerId) {
    return new Promise((resolve, reject) => {
      this.getPlayer(playerId).then((player) => {
        if (!(player.playerAccounts.includes(parseInt(summonerId)))) {
          player.playerAccounts.push(parseInt(summonerId));
          this.playerCollection.set(player.id, player);
          resolve(parseInt(summonerId));
        } else {
          reject();
        }
      });
    });
  }

  removeSummonerFromPlayer(playerId, summonerId) {
    return new Promise((resolve, reject) => {
      this.getPlayer(playerId).then((player) => {
        if (player.playerAccounts.includes(parseInt(summonerId))) {
          player.playerAccounts = player.playerAccounts.filter((summoner) => {
            return summoner != parseInt(summonerId);
          });
          this.playerCollection.set(player.id, player);
          resolve(player.playerAccounts);
        } else {
          reject();
        }
      });
    });
  }




  /////////Match related operations
  getMatch(id, reference) {
    return new Promise(() => {
      var match = this.matchCollection.get(id);
      if (match) {
        if (reference) {
          console.log("adding reference to " + match.gameId);
          match.references++;
          this.matchCollection.set(match.gameId, match);
        }
        resolve(match);
      } else {
        reject();
      }
    });
  }

  addMatch(match) {
    return new Promise((resolve, reject) => {
      this.getMatch(match.gameId, false).then((dbMatch) => {
        match.references = dbMatch.references + 1;
      }).catch(() => {
        console.log("adding reference to " + match.gameId);
        match.references = 1;
      }).finally(() => {
        var savedMatch = this.matchCollection.set(match.gameId, match);
        resolve(savedMatch);
      });
    });
  }

  removeMatch(id) {
    return new Promise((resolve, reject) => {
      this.getMatch(match.gameId, false).then((dbMatch) => {
        console.log("removing reference from " + match.gameId);
        dbMatch.references--;
        if (dbMatch.references === 0) {
          console.log("removing match");
          this.matchCollection.delete(id);
          resolve();
        }
      }).catch(() => {
        reject();
      });
    })
  }



  /////////player related operations
  getPlayer(id) {
    return new Promise((resolve, reject) => {
      var player = this.playerCollection.get(id);
      player ? resolve(player) : reject();
    });
  }

  getPlayerIdByUsername(username) {
    return new Promise((resolve, reject) => {
      var resPlayer = Array.from(this.playerCollection.values()).find((player) => {
        return player.name === username;
      });
      resPlayer ? resolve(resPlayer.id) : reject();
    });
  }

  updatePlayer(player) {
    return new Promise((resolve, reject) => {
      this.getPlayer(player.id).then((editingPlayer) => {
        this.playerCollection.set(player.id, player);
        resolve(player);
      }).catch(() => {
        reject();
      });
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