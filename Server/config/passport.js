const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const auth = require('../services/authentication');

module.exports = (passport, db) => {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = auth.getSecret();
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    db.getUser(jwt_payload.id).then((user) => {
      return done(null, user);
    }).catch((err) => {
      return done(err, false);
    });
  }));
}