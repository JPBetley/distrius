var mongoose = require('mongoose'),
    path = require('path'),
    File = mongoose.model('File'),
    slug_service = require('../services/slug_service');

exports.index = function(req, res) {
    res.render('files/index', {});
};

exports.create = function(req, res) {
    var url = req.body.url,
        name = path.basename(url);
    File.create({
        url: url,
        name: name,
        ipaddress: req.ip,
        hostname: req.hostname,
        slug: slug_service.generate_slug()
    }, function(createErr, file) {
        res.redirect('/file/' + file.slug);
    });
};

exports.show = function(req, res) {
    var slug = req.params.slug;
    File.findOne({ slug: slug}, function(err, file) {
        if(err) throw new Error(err);
        res.render('files/show', { file: file });
    });
};

