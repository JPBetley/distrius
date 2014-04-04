var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'distrius'
    },
    port: 3000,
    db: 'mongodb://localhost/distrius'
  },

  test: {
    root: rootPath,
    app: {
      name: 'distrius'
    },
    port: 3000,
    db: 'mongodb://localhost/distrius'
  },

  production: {
    root: rootPath,
    app: {
      name: 'shippit'
    },
    port: 3000,
    db: 'mongodb://localhost/shippit-production'
  }
};

module.exports = config[env];
