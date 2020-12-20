odoo.define('website_diza.home', function(require) {
    "use strict";
    var Widget = require('web.Widget');
    var sAnimations = require('website.content.snippets.animation');
    sAnimations.registry.DizaHome = Widget.extend({
        selector: '.diza_product_item',
        // QWeb template to use when rendering the object
        events: {
            // events binding example
            'click .a-submit': '_onClickSubmit',
        },

        init: function(parent) {
            console.log(322)
            this._super(parent);
            // insert code to execute before rendering, for object
            // initialization

        },
        start: function() {
            var sup = this._super();

        },
        /**
         * @private
         * @param {Event} ev
         */
        _onClickSubmit: function(ev, forceSubmit) {
            var $aSubmit = $(ev.currentTarget);
            $aSubmit.closest('form').submit();
            ev.preventDefault();
            return false
        },
    });

});