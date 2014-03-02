var mongoose = require('mongoose'),
    Download = mongoose.model('Download');

exports.index = function(req, res){
    Download.find(function(err, downloads){
        if(err) throw new Error(err);
        res.render('home/index', {
            title: 'Generator-Express MVC',
            downloads: downloads
        });
    });
};
