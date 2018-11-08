const riotAPI = require('../services/riotAPI');

module.exports = (app, db) => {
  const playerController = new (require('../controllers/playerController'))(db);

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/', (req, res) => {
    res.send({ message: 'Hello World!!!' });
  });

  app.get('/users', (req, res) => {
    res.send({ message: 'users page' });
  });

  app.get('/users/:id', (req, res) => {
    var user = db.getUser(req.params.id);
    if(user != undefined) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  });

  app.get('/users/:id/dashboard', (req, res) => {
    res.send({ message: 'user dashboard page' });
  });

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

  app.get('/users/:id/players', (req, res) => {
    var dbUser = db.getUser(req.params.id);
    if (dbUser != undefined){
      playerController.getPlayers(dbUser.followingPlayers, (followingPlayers) => {
        res.send(followingPlayers);
      });
    } else {
      res.status(404).send('User not found');
    }
  });

}