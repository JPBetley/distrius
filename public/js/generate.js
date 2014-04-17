var Generate = (function($) {
    var generate = {
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
            this.form.bind('submit', _formSubmit);
            this.plus_button.on('click', _addUse);
            this.minus_button.on('click', _subtractUse);
            this.uses_input.on('blur', _manualChange);
            this.uses_input.on('keypress', _inputKeyPress);
        }
    };

    var _inputKeyPress = function(evt) {
        evt = evt || window.event;
        var charCode = evt.which || evt.keyCode;
        var charStr = String.fromCharCode(charCode);
        if (!/\d/.test(charStr)) {
            return false;
        }
    };

    var _manualChange = function(evt) {
        if (generate.uses_input.val() == "") {
            generate.uses_input.val(1);
        }

        var value = parseInt(generate.uses_input.val());
        if (!generate.validateUses(value)) {
            generate.uses_input.val(1);
        }
    };

    var _modifyUsage = function(change) {
        var currentValue = parseInt(generate.uses_input.val()),
            newValue = currentValue + change;

        if (generate.validateUses(newValue)) {
            generate.uses_input.val(currentValue + change);
        }
    };

    var _validateUses = function(value) {
        if (value < 1) {
            alert('Cannot have less than one usage.');
            return false;
        } else if (value > 50) {
            alert("That's a lot of downloads. Why don't you just give out a public link?");
            return false;
        }
        return true;
    };

    var _addUse = function() {
        generate.modifyUsage(1);
    };

    var _subtractUse = function() {
        generate.modifyUsage(-1);
    };

    var _formSubmit = function(e) {
        e.preventDefault();
        e.stopPropagation();
        generate.generateLink();
    };

    var _generateLink = function() {
        var data = generate.form.serialize();
        $.ajax({
            type: 'POST',
            url: '/download',
            data: data
        }).done(function(data) {
            generate.displayLink(data.slug);
        });
    };

    var _displayLink = function(link) {
        generate.url_output.val(window.location.origin + "/download/" + link);
        generate.url_output.focus();
        generate.url_output.select();
    };

    var init = function() {
        generate.init();
    };

    return {
        init: init
    };

})(jQuery);
