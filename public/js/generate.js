(function($) {
    var Generate = {
        init: function() {
            this.cacheElements();
            this.bindEvents();
        },

        cacheElements: function() {
            this.form = $('#generate-form');
            this.url_output = $('#url-output');
        },

        bindEvents: function() {
            this.form.bind('submit', this.formSubmit);
        },

        formSubmit: function(e) {
            e.preventDefault();
            e.stopPropagation();
            Generate.generateLink();
        },

        generateLink: function() {
            var data = Generate.form.serialize();
            $.ajax({
                type: 'POST',
                url: '/download',
                data: data
            }).done(function(data) {
                Generate.displayLink(data.slug);
            });
        },

        displayLink: function(link) {
            Generate.url_output.val(window.location.origin + "/download/" + link);
            Generate.url_output.focus();
            Generate.url_output.select();
        }
    };

    Generate.init();

})(jQuery);
