module.exports = function(app){

	//home route
	var home = require('../app/controllers/home');
	app.get('/', home.index);

	var file = require('../app/controllers/file');
	app.get('/files', file.index);

};
