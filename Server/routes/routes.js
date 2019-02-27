const passport = require('passport');
const riotAPI = require('../services/riotAPI');
const auth = require('../services/authentication');
const sseExpress = require('sse-express');

module.exports = (app, db) => {
  const summonerController = new (require('../controllers/summonerController'))(db);
  const playerController = new (require('../controllers/playerController'))(summonerController, db);

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });


  app.get('/', (req, res) => {
    res.send({ message: 'Hello World!!!' });
  });


  /////////user routes
  const userCheck = (req, res, next) => {
    if (req.user.id != req.params.id) {
      return res.status(401).send('Access denied');
    }
    next();
  }

  app.get('/users', (req, res) => {
    res.send({ message: 'users page' });
  });

  app.get('/users/:id', passport.authenticate('jwt', {session: false}), userCheck, (req, res) => {
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

  app.get('/users/:id/players', passport.authenticate('jwt', {session: false}), userCheck, sseExpress, (req, res) => {
    db.getUser(req.params.id).then((dbUser) => {
      playerController.getPlayersParallel(dbUser.followingPlayers, (followingPlayer) => {
        if (followingPlayer) {
          res.sse('playerSent', followingPlayer);
        } else {
          res.end();
        }
      });
    }).catch(() => {
      res.status(404).send('User not found');
    });
  });

  app.post('/users/:id/players/', passport.authenticate('jwt', {session: false}), userCheck, (req, res) => {
    db.getPlayerIdByUsername(req.body.username).then((resSummonerId) => {
      return db.addPlayerToUser(req.params.id, resSummonerId).catch(() => {
        res.status(409).send('Player conflict');
      });
    }).catch(() => {
      res.status(404).send('Player not found');
    }).then((resPlayerId) => {
      return playerController.getPlayer(resPlayerId);
    }).then((resPlayer) => {
      res.send(resPlayer);
    });
  });

  app.delete('/users/:id/players/:playerId', passport.authenticate('jwt', {session: false}), userCheck, (req, res) => {
    db.removePlayerFromUser(req.params.id, req.params.playerId).then((newPlayerCollection) => {
      res.send(newPlayerCollection);
    }).catch(() => {
      res.status(404).send('Player does not exist in user');
    });
  });

  app.put('/users/:id/settings', passport.authenticate('jwt', {session: false}), userCheck, (req, res) => {
    db.updateUserSettings(req.params.id, req.body).then((savedSettings) => {
      if (savedSettings) {
        res.send(savedSettings);
      }
    })
  });




  //////players routes
  app.get('/players', (req, res) => {
    res.send({ message: 'players page' });
  });

  app.get('/players/:username', (req, res) => {
    playerController.getPlayerByUsername(req.params.username).then((resPlayer) => {
      res.send(resPlayer);
    }).catch(() => {
      res.status(404).send('Player not found');
    });
  });

  app.get('/players/:username/summoners', sseExpress, (req, res) => {
    playerController.getPlayerByUsername(req.params.username).then((resPlayer) => {
      summonerController.getSummonersParallel(resPlayer.playerAccounts, (summoner) => {
        if (summoner) {
          res.sse('summonerSent', summoner);
        } else {
          res.sse('summonerSentEnd');
          res.end();
        }
      });
    }).catch(() => {
      res.status(404).send('Player not found');
    });
  });

  app.post('/players/:username/summoners/', (req, res) => {
    db.getSummonerIdByUsername(req.body.username).then((resSummonerId) => {
      db.getPlayerIdByUsername(req.params.username).then((playerId) => {
        db.addSummonerToPlayer(playerId, resSummonerId).then((resSummonerId) => {
          summonerController.getSummoner(resSummonerId).then((resSummoner) => {
            res.send(resSummoner);
          });
        }).catch(() => {
          res.status(409).send('Player conflict');
        });
      }).catch(() => {
        res.status(404).send('Player not found');
      });
    }).catch(() => {
      res.status(404).send('Summoner not found');
    });
  });

  app.delete('/players/:username/summoners/:summonerId', (req, res) => {
    db.getPlayerIdByUsername(req.params.username).then((playerId) => {
      db.removeSummonerFromPlayer(playerId, req.params.summonerId).then((newSummonerCollection) => {
        res.send(newSummonerCollection);
      }).catch(() => {
        res.status(404).send('Summoner does not exist in player');
      });
    }).catch(() => {
      res.status(404).send('Player not found');
    });


    
  });






  //////authentication routes

  app.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    db.getUserByEmail(email).then((user) => {
      db.getPassword(user.id).then((hash) => {
        auth.comparePassword(password, hash).then(() => {
          const token = auth.signToken({id: user.id, username: user.username});
          var resJson = {
            success: true,
            token: 'JWT ' + token,
            user: {
              id: user.id,
              username: user.username,
              email: user.email
            }
          };
          res.send(resJson);
        }).catch((err) => {
          res.status(401).send(err);
        });
      });
    }).catch(() => {
      res.status(401).send('User not found');
    })


  });



}



