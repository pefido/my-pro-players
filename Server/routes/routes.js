const riotAPI = require('../services/riotAPI');
const sseExpress = require('sse-express');

module.exports = (app, db) => {
  const summonerController = new (require('../controllers/summonerController'))(db);
  const playerController = new (require('../controllers/playerController'))(summonerController, db);

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/', (req, res) => {
    res.send({ message: 'Hello World!!!' });
  });


  /////////user routes
  app.get('/users', (req, res) => {
    res.send({ message: 'users page' });
  });

  app.get('/users/:id', (req, res) => {
    db.getUser(req.params.id).then((user) => {
      res.send(user);
    }).catch(() => {
      res.status(404).send("User not found");
    });
  });

  app.get('/users/:id/dashboard', (req, res) => {
    res.send({ message: 'user dashboard page' });
  });

  // app.get('/users/:id/players', sseExpress, (req, res) => {
  //   db.getUser(req.params.id).then((dbUser) => {
  //     summonerController.getSummonersParallel(dbUser.followingPlayers, (followingPlayers) => {
  //         if(followingPlayers) {
  //           res.sse('playerSent', followingPlayers);
  //         } else {
  //           res.sse('playerSentEnd');
  //           res.end();
  //         }
  //       });
  //   }).catch(() => {
  //     res.status(404).send('User not found');
  //   });
  // });

  app.get('/users/:id/players', sseExpress, (req, res) => {
    db.getUser(req.params.id).then((dbUser) => {
      playerController.getPlayersParallel(dbUser.followingPlayers, (followingPlayer) => {
          if(followingPlayer) {
            res.sse('playerSent', followingPlayer);
          } else {
            res.sse('playerSentEnd');
            res.end();
          }
        });
    }).catch(() => {
      res.status(404).send('User not found');
    });
  });

  app.post('/users/:id/players/', (req, res) => {
    db.getSummonerIdByUsername(req.body.username).then((resSummonerId) => {
        return db.addSummonerToUser(req.params.id, resSummonerId);
    }).catch(() => {
      res.status(404).send('Summoner not found');
    }).then((resSummonerId) => {
      return summonerController.getSummoner(resSummonerId);
    }).then((resSummoner) => {
      res.send(resSummoner);
    }).catch(() => {
      res.status(409).send('Player conflict');
    });
  });

  app.delete('/users/:id/players/:playerId', (req, res) => {
    db.removeSummonerFromUser(req.params.id, req.params.playerId).then((newSummonerCollection) => {
        res.send(newSummonerCollection);
    }).catch(() => {
      res.status(404).send('Player does not exist in user');
    });
  });

  app.put('/users/:id/settings', (req, res) => {
    db.updateUserSettings(req.params.id, req.body).then((savedSettings) => {
      if(savedSettings) {
        res.send(savedSettings);
      }
    })
  });




  //////players routes
  app.get('/players', (req, res) => {
    res.send({ message: 'players page' });
  });

  app.get('/players/:id', (req, res) => {
    playerController.getPlayer(req.params.id).then((resPlayer) => {
        res.send(resPlayer);
    }).catch(() => {
      res.status(404).send('Player not found');
    });
  });

}