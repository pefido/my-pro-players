const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class authentication {
  constructor() {
    this.authSecret = JSON.parse(fs.readFileSync('./config/config.json')).authSecret;
  }

  getSecret() {
    return this.authSecret;
  }

  comparePassword(tryPassword, hashedPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(tryPassword, hashedPassword).then((isMatch) => {
        isMatch ? resolve() : reject("Wrong password");
      }).catch((err) => {
        reject(err);
      })
    });
  }

  signToken(entity) {
    return jwt.sign(entity, this.authSecret, {expiresIn: 3600});
  }

}

module.exports = new authentication();