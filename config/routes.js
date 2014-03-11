module.exports = function(app){

	//home route
	var file = require('../app/controllers/file');
	app.get('/', file.index);
    app.post('/', file.create);
    app.get('/file/:slug', file.show);

	var download = require('../app/controllers/download');
	app.get('/download/:slug', download.download);

};
