var Generate = (function($) {
    var Generate = {
        init: function() {
            this.cacheElements();
            this.bindEvents();
        },

        cacheElements: function() {
            this.form = $('#generate-form');
            this.url_output = $('#url-output');
            this.uses_input = $('#uses-input');
            this.plus_button = $('#plus-button');
            this.minus_button = $('#minus-button');
        },

        bindEvents: function() {
            this.form.bind('submit', this.formSubmit);
            this.plus_button.on('click', this.addUse);
            this.minus_button.on('click', this.subtractUse);
            this.uses_input.on('blur', this.manualChange);
            this.uses_input.on('keypress', this.inputKeyPress);
        },

        inputKeyPress: function(evt) {
            evt = evt || window.event;
            var charCode = evt.which || evt.keyCode;
            var charStr = String.fromCharCode(charCode);
            if (!/\d/.test(charStr)) {
                return false;
            }
        },

        manualChange: function(evt) {
            if (Generate.uses_input.val() == "") {
                Generate.uses_input.val(1);
            }

            var value = parseInt(Generate.uses_input.val());
            if (!Generate.validateUses(value)) {
                Generate.uses_input.val(1);
            }
        },

        modifyUsage: function(change) {
            var currentValue = parseInt(Generate.uses_input.val()),
                newValue = currentValue + change;

            if (Generate.validateUses(newValue)) {
                Generate.uses_input.val(currentValue + change);
            }
        },

        validateUses: function(value) {
            if (value < 1) {
                alert('Cannot have less than one usage.');
                return false;
            } else if (value > 50) {
                alert("That's a lot of downloads. Why don't you just give out a public link?");
                return false;
            }
            return true;
        },

        addUse: function() {
            Generate.modifyUsage(1);
        },

        subtractUse: function() {
            Generate.modifyUsage(-1);
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

    return Generate;

})(jQuery);
