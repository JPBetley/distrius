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

        if (downloadCode.length > 0) {
            $.ajax({
                url: "/download/" + downloadCode,
                type: "GET",
            })
            .fail(_downloadError);
        } else {
            alert("Must enter a download code.");
        }
    };

    var _downloadError = function(error) {
        alert(error);
    };

})(jQuery);