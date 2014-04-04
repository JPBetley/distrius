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
      name: process.env.APP_NAME
    },
    port: process.env.PORT,
    db: process.env.DATABASE
  }
};

module.exports = config[env];
