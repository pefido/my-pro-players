'use strict';

const Datastore = require('nedb');
const Hapi = require('hapi');

// load db
const db = new Datastore({
  filename: './config/datastore.db',
  autoload: true
});

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

server.route(require('./config/routes'));

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
