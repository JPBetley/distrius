var express = require('express');

module.exports = function(app, config) {
  app.configure(function () {
    app.use(express.compress());
    app.use(express.static(config.root + '/public'));
    app.enable('trust proxy');
    app.set('port', config.port);
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');
    app.set('title', 'Distrius');
    app.use(express.favicon(config.root + '/public/img/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: process.env.SESSION_KEY || "development-key" }));
    app.use(express.csrf());
    app.use(express.methodOverride());
    app.use(function(req, res, next) {
        res.locals.token = req.csrfToken();
        next();
    });


    app.use(app.router);
    app.use(function(req, res) {
      res.status(404).render('404', { title: '404' });
    });
  });
};
