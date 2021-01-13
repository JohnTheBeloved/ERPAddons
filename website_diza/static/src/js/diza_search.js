odoo.define('diza.search', function(require) {
    'use strict';

    var sAnimations = require('website.content.snippets.animation');
    var core = require('web.core');
    var _t = core._t;

    var timeout;

    sAnimations.registry.websiteSaleSearchInput = sAnimations.Class.extend({
        selector: '.tbay-element-search-form',
        events: {
            // events binding example
            'input .tbay-search': '_onChangeSubmit',
            'blur .tbay-search': '_onDismissResult',
            'focus .tbay-search': '_onShowResult',
            'click .autocomplete-suggestions': '_onClickResult',
        },

        /**
         * @override
         */
        start: function() {
            var def = this._super.apply(this, arguments);
            if (this.editableMode) {
                return def;
            }
            console.log(this)
            return def;
        },

        //--------------------------------------------------------------------------
        // Handlers
        //--------------------------------------------------------------------------

        /**
         * @private
         * @param {Event} ev
         */
        _onChangeSubmit: function(ev) {
            var self = this;
            clearTimeout(timeout);
            var $aSubmit = $(ev.currentTarget);
            var $form = $aSubmit.closest('form');
            $form.addClass('tbay-loading');
            const param = this._messageFetchPrepareParams($form);
            $('.diza-search-results').html('')
            timeout = setTimeout(function() {
                $.get("/shop", {
                    search: param['search_text'],
                    type: 'popover',
                }).then(function(data) {
                    $('.diza-search-results').html(data)
                    console.log(323, self.$el.find('.list-header'), 'sonc', self._onClickResult)
                    $(data).find('.list-header').bind('click', self._onClickResult)
                    $form.removeClass('tbay-loading');
                    self.$el.find('.autocomplete-suggestions').removeClass("hide");
                    //self.$el.find('#cart_dropdown').addClass("show");
                });
            }, 100);
        },

        _messageFetchPrepareParams: function($form) {
            var values = {};
            $form.find('input').each(function() {
                values[this.name] = $(this).val().replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");;
            });
            return values
        },

        /**
         * @private
         * @param {Event} ev
         */
        _onDismissResult: function(ev) {
            console.log({ ev })
            var self = this;
            setTimeout(function() {
                self.$el.find('.autocomplete-suggestions').addClass("hide");
            }, 100);
        },

        /**
         * @private
         * @param {Event} ev
         */
        _onShowResult: function(ev) {
            var self = this;
            setTimeout(function() {
                self.$el.find('.autocomplete-suggestions').removeClass("hide");
            }, 100);
        },
        _onClickResult: function(ev) {
            console.log({ ev })
                // ev.preventDefault();
        },
    });
});