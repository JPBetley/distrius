var mongoose = require('mongoose'),
    File = mongoose.model('File');

exports.index = function(req, res) {
    File.find(function(err, files) {
        if(err) throw new Error(err);
        res.render('files/index', {
            title: 'Shippit',
            files: files
        });
    });
};
