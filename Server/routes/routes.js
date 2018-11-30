const riotAPI = require('../services/riotAPI');

module.exports = (app, db) => {
  const playerController = new (require('../controllers/playerController'))(db);

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
    var user = db.getUser(req.params.id);
    if (user != undefined) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  });

  app.get('/users/:id/dashboard', (req, res) => {
    res.send({ message: 'user dashboard page' });
  });

  app.get('/users/:id/players', (req, res) => {
    var dbUser = db.getUser(req.params.id);
    if (dbUser != undefined) {
      playerController.getPlayers(dbUser.followingPlayers, (followingPlayers) => {
        res.send(followingPlayers);
      });
    } else {
      res.status(404).send('User not found');
    }
  });

  app.post('/users/:id/players/', (req, res) => {
    var resPlayerId = db.getPlayerIdByUsername(req.body.username);
    if (resPlayerId) {
      if( db.addPlayerToUser(req.params.id, resPlayerId) ) {
        playerController.getPlayer(resPlayerId, (resPlayer) => {
          res.send(resPlayer);
        });
      } else {
        res.status(409).send('Player conflict');
      }
    } else {
      res.status(404).send('Player not found');
    }
  });

  app.delete('/users/:id/players/:playerId', (req, res) => {
    db.removePlayerFromUser(req.params.id, req.params.playerId, (newPlayerCollection) => {
      if(newPlayerCollection != undefined) {
        res.send(newPlayerCollection);
      } else {
        res.status(404).send('Player does not exist in user');
      }
    })
  });

  app.put('/users/:id/settings', (req, res) => {
    db.updateUserSettings(req.params.id, req.body, (savedSettings) => {
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
    playerController.getPlayer(req.params.id, (resPlayer) => {
      if (resPlayer != undefined) {
        res.send(resPlayer);
      } else {
        res.status(404).send('Player not found');
      }
    });
  });

}