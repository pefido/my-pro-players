const bcrypt = require('bcryptjs');

class DB {

  constructor() {
    this.summonerCollection = new Map();
    this.playerCollection = new Map();
    this.userCollection = new Map();
    this.passwordCollection = new Map();
    this.championsCollection = {};
    this.matchCollection = [];
    this.matchmakingQueues = [];


    //insert dummy data
    this.summonerCollection.set("ac7QrhhCQ8bAvLf8JGRY1Mk_irmfaHZJasSl99IRgN3cg7A", {
      entityType: 'summoner',
      id: "ac7QrhhCQ8bAvLf8JGRY1Mk_irmfaHZJasSl99IRgN3cg7A",
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

    this.summonerCollection.set("LkyihBWP-SMM9_N6xOs1ZpriIE8o7Xub1IBWYQ9xgngNMao", {
      entityType: 'summoner',
      id: "LkyihBWP-SMM9_N6xOs1ZpriIE8o7Xub1IBWYQ9xgngNMao",
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

    this.summonerCollection.set("QPOeQGAQEPIrhslb3-oOMT58DasdW1jk03Fp0focsQaYBGg", {
      entityType: 'summoner',
      id: "QPOeQGAQEPIrhslb3-oOMT58DasdW1jk03Fp0focsQaYBGg",
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

    this.summonerCollection.set("777Qwh_kG6enyD9yLMr05fG4hHorkVdfJyJad6ZNEMRLiL8", {
      entityType: 'summoner',
      id: "777Qwh_kG6enyD9yLMr05fG4hHorkVdfJyJad6ZNEMRLiL8",
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

    this.summonerCollection.set("7ICTgTqpqPdID4vsJLC60YID09r429eFiA1DEL-aX65TN4I", {
      entityType: 'summoner',
      id: "7ICTgTqpqPdID4vsJLC60YID09r429eFiA1DEL-aX65TN4I",
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

    this.summonerCollection.set("8Dgq4ptbuDMdn5Bs8s1YWQ3EkIq7CvSZep8aps-osGzApTfY", {
      entityType: 'summoner',
      id: "8Dgq4ptbuDMdn5Bs8s1YWQ3EkIq7CvSZep8aps-osGzApTfY",
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

    this.summonerCollection.set("OZl5H9w_2w0b7Wg2DuKBtMaOAjOT4HOdmsAKeBofoJIuU0U", {
      entityType: 'summoner',
      id: "OZl5H9w_2w0b7Wg2DuKBtMaOAjOT4HOdmsAKeBofoJIuU0U",
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

    this.summonerCollection.set("5qkrWxI-KzNGidDlwfCcUmdU7mTRk6fMWuu6kEr_qLpo9lc", {
      entityType: 'summoner',
      id: "5qkrWxI-KzNGidDlwfCcUmdU7mTRk6fMWuu6kEr_qLpo9lc",
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

    this.summonerCollection.set("QnMdeyX4xlF_IcoytbefUEHaYpHpV1MlgC2998P3DcAXAqc", {
      entityType: 'summoner',
      id: "QnMdeyX4xlF_IcoytbefUEHaYpHpV1MlgC2998P3DcAXAqc",
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

    this.summonerCollection.set("Wj2gC-bHSMMMP31ZUzEXXfzz4EwBdJamxaLDXN_wVTyF2l8", {
      entityType: 'summoner',
      id: "Wj2gC-bHSMMMP31ZUzEXXfzz4EwBdJamxaLDXN_wVTyF2l8",
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

    this.summonerCollection.set("PeqiHrp7dHMh7YmuHo4wp5tHWH7G5F7y0FAcoL4AdgfFOgE", {
      entityType: 'summoner',
      id: "PeqiHrp7dHMh7YmuHo4wp5tHWH7G5F7y0FAcoL4AdgfFOgE",
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

    this.summonerCollection.set("N7iwO_A93MrltqC_8xDcmN7Eeil7n3_eEOQjc1nEw1yWrbk", {
      entityType: 'summoner',
      id: "N7iwO_A93MrltqC_8xDcmN7Eeil7n3_eEOQjc1nEw1yWrbk",
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

    this.summonerCollection.set("hMpcX-R5ygyrZ8zSD6Jy2VANdIZ_c-oDSRY__9V8fFa9zQg", {
      entityType: 'summoner',
      id: "hMpcX-R5ygyrZ8zSD6Jy2VANdIZ_c-oDSRY__9V8fFa9zQg",
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

    this.summonerCollection.set("lf_VCpG2YcvN7F8Nlo8cPfGgMgNDmSWntgOcysq1aTlEcRI", {
      entityType: 'summoner',
      id: "lf_VCpG2YcvN7F8Nlo8cPfGgMgNDmSWntgOcysq1aTlEcRI",
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

    this.summonerCollection.set("kO_njTqyRwYMyfcKwpMDww9NBLZOp1yl4JOpMFpNxxjQ8LU", {
      entityType: 'summoner',
      id: "kO_njTqyRwYMyfcKwpMDww9NBLZOp1yl4JOpMFpNxxjQ8LU",
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

    this.summonerCollection.set("wZUpEoF7OQqXrfEumXFcNUqvokzHswnHw4ihYV7buhzJA94", {
      entityType: 'summoner',
      id: "wZUpEoF7OQqXrfEumXFcNUqvokzHswnHw4ihYV7buhzJA94",
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
      email: 'pefido@gmail.com',
      settings: {
        system: 'mac'
      },
      followingPlayers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    });

    this.userCollection.set(2, {
      id: 2,
      username: 'theTruckman',
      email: 'fignico24@gmail.com',
      settings: {
        system: 'windows'
      },
      followingPlayers: [3]
    });







    bcrypt.genSalt(10).then((salt) => {
      bcrypt.hash("password1", salt).then((hash) => {
        this.passwordCollection.set(1, hash);
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err)
    });

    bcrypt.genSalt(10).then((salt) => {
      bcrypt.hash("password2", salt).then((hash) => {
        this.passwordCollection.set(2, hash);
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err)
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
      relevantSummoner: "ac7QrhhCQ8bAvLf8JGRY1Mk_irmfaHZJasSl99IRgN3cg7A",
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: ["ac7QrhhCQ8bAvLf8JGRY1Mk_irmfaHZJasSl99IRgN3cg7A", "hMpcX-R5ygyrZ8zSD6Jy2VANdIZ_c-oDSRY__9V8fFa9zQg"]
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
      relevantSummoner: "LkyihBWP-SMM9_N6xOs1ZpriIE8o7Xub1IBWYQ9xgngNMao",
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: ["LkyihBWP-SMM9_N6xOs1ZpriIE8o7Xub1IBWYQ9xgngNMao"]
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
      relevantSummoner: "QPOeQGAQEPIrhslb3-oOMT58DasdW1jk03Fp0focsQaYBGg",
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: ["7ICTgTqpqPdID4vsJLC60YID09r429eFiA1DEL-aX65TN4I", "QPOeQGAQEPIrhslb3-oOMT58DasdW1jk03Fp0focsQaYBGg"]
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
      relevantSummoner: "777Qwh_kG6enyD9yLMr05fG4hHorkVdfJyJad6ZNEMRLiL8",
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: ["777Qwh_kG6enyD9yLMr05fG4hHorkVdfJyJad6ZNEMRLiL8"]
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
      relevantSummoner: "8Dgq4ptbuDMdn5Bs8s1YWQ3EkIq7CvSZep8aps-osGzApTfY",
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: ["8Dgq4ptbuDMdn5Bs8s1YWQ3EkIq7CvSZep8aps-osGzApTfY"]
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
      relevantSummoner: "OZl5H9w_2w0b7Wg2DuKBtMaOAjOT4HOdmsAKeBofoJIuU0U",
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: ["OZl5H9w_2w0b7Wg2DuKBtMaOAjOT4HOdmsAKeBofoJIuU0U"]
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
      relevantSummoner: "5qkrWxI-KzNGidDlwfCcUmdU7mTRk6fMWuu6kEr_qLpo9lc",
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: ["5qkrWxI-KzNGidDlwfCcUmdU7mTRk6fMWuu6kEr_qLpo9lc"]
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
      relevantSummoner: "QnMdeyX4xlF_IcoytbefUEHaYpHpV1MlgC2998P3DcAXAqc",
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: ["QnMdeyX4xlF_IcoytbefUEHaYpHpV1MlgC2998P3DcAXAqc"]
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
      relevantSummoner: "Wj2gC-bHSMMMP31ZUzEXXfzz4EwBdJamxaLDXN_wVTyF2l8",
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: ["Wj2gC-bHSMMMP31ZUzEXXfzz4EwBdJamxaLDXN_wVTyF2l8"]
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
      relevantSummoner: "PeqiHrp7dHMh7YmuHo4wp5tHWH7G5F7y0FAcoL4AdgfFOgE",
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: ["PeqiHrp7dHMh7YmuHo4wp5tHWH7G5F7y0FAcoL4AdgfFOgE"]
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
      relevantSummoner: "N7iwO_A93MrltqC_8xDcmN7Eeil7n3_eEOQjc1nEw1yWrbk",
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: ["N7iwO_A93MrltqC_8xDcmN7Eeil7n3_eEOQjc1nEw1yWrbk"]
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
      relevantSummoner: "ac7QrhhCQ8bAvLf8JGRY1Mk_irmfaHZJasSl99IRgN3cg7A",
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: ["kO_njTqyRwYMyfcKwpMDww9NBLZOp1yl4JOpMFpNxxjQ8LU"]
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
      relevantSummoner: "wZUpEoF7OQqXrfEumXFcNUqvokzHswnHw4ihYV7buhzJA94",
      playing: false,
      lastGameEnd: 1545048276879,
      lastGameStart: 1545048276879,
      playerAccounts: ["wZUpEoF7OQqXrfEumXFcNUqvokzHswnHw4ihYV7buhzJA94"]
    });


  }












  /////////password related operations
  getPassword(id) {
    return new Promise((resolve, reject) => {
      var hash = this.passwordCollection.get(parseInt(id));
      hash ? resolve(hash) : reject();
    });
  }




  /////////user related operations
  getUser(id) {
    return new Promise((resolve, reject) => {
      var user = this.userCollection.get(parseInt(id));
      user ? resolve(user) : reject("user not found");
    });
  }

  getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      var resUser = Array.from(this.userCollection.values()).find((user) => {
        return user.email === email;
      });
      resUser ? resolve(resUser) : reject();
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
      var summoner = this.summonerCollection.get(id);
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
        if (!(player.playerAccounts.includes(summonerId))) {
          player.playerAccounts.push(summonerId);
          this.playerCollection.set(player.id, player);
          resolve(summonerId);
        } else {
          reject();
        }
      });
    });
  }

  removeSummonerFromPlayer(playerId, summonerId) {
    return new Promise((resolve, reject) => {
      this.getPlayer(playerId).then((player) => {
        if (player.playerAccounts.includes(summonerId)) {
          player.playerAccounts = player.playerAccounts.filter((summoner) => {
            return summoner != summonerId;
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