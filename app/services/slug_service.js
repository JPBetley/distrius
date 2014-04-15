var randomstring = require("randomstring");

exports.generate_slug = function() {
    return randomstring.generate(8);
}
