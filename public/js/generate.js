(function() {
    var Generate = {
        init: function() {
            cacheElements();
        },

        cacheElements: function() {
            this.form = document.getElementById('generate-form');
            this.url_output = document.getElementById('url-output');
        }
    };
})();
