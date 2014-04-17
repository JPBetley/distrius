var Download = (function($) {

    var download = {
        init: function() {
            this.cacheElements();
            this.bindEvents();
        },

        cacheElements: function() {
            this.$download = $('#js-download');
            this.$submit = $('#js-submit');
        },

        bindEvents: function() {
            this.$submit.on('click', _getDownload);
        }
    };

    var _getDownload = function () {
        var downloadCode = this.$download.val();

        $.ajax({
            
        });
    };

})(jQuery);