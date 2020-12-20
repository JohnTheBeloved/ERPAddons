odoo.define('website_diza.add_to_cart', function(require) {
    "use strict";
    var Widget = require('web.Widget');
    var rpc = require('web.rpc');
    var ajax = require('web.ajax');
    var core = require('web.core');
    var sAnimations = require('website.content.snippets.animation');
    var qweb = core.qweb;

    var DizaNewCartProduct = Widget.extend({
        template: 'diza.new_cart_product',
        init: function(parent, productName) {
            this._super.apply(this, arguments);
            this.set('product_name', productName)
        },
        willStart: function() {
            return this._loadTemplates();
        },
        _loadTemplates: function() {
            return ajax.loadXML('/website_diza/static/src/xml/diza_new_cart_product.xml', qweb);
        },
    })

    sAnimations.registry.DizaAddToCart = Widget.extend({
        selector: 'form.cart',
        // QWeb template to use when rendering the object
        events: {
            // events binding example
            'click .a-submit': '_onClickSubmit',
        },

        init: function(parent) {
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
            ev.preventDefault();
            var $aSubmit = $(ev.currentTarget);
            var $form = $aSubmit.closest('form');
            const param = this._messageFetchPrepareParams($form);
            return this._rpc({
                route: "/shop/cart/update_post",
                params: {
                    product_id: param['product_id'],
                    set_qty: param['add_qty']
                },
            }).then(function(result) {
                var new_cart_product = new DizaNewCartProduct(null, param['product_name'] || 'Product')
                $('.woocommerce-message') && $('.woocommerce-message').remove();
                new_cart_product.prependTo('#main');
                return false;
            });
        },

        _messageFetchPrepareParams: function($form) {
            var values = {};
            $form.children('input').each(function() {
                values[this.name] = $(this).val();
            });
            return values
        },
    });
    return {
        DizaNewCartProduct: DizaNewCartProduct
    }

});

odoo.define('diza.cart', function(require) {
    'use strict';

    var sAnimations = require('website.content.snippets.animation');
    var core = require('web.core');
    var _t = core._t;

    var timeout;

    sAnimations.registry.websiteSaleCartLink = sAnimations.Class.extend({
        selector: '.mini-cart',
        read_events: {
            'mouseenter': '_onMouseEnter',
            'mouseleave': '_onMouseLeave',
        },

        /**
         * @override
         */
        start: function() {
            var def = this._super.apply(this, arguments);
            if (this.editableMode) {
                return def;
            }
            return def;
        },

        //--------------------------------------------------------------------------
        // Handlers
        //--------------------------------------------------------------------------

        /**
         * @private
         * @param {Event} ev
         */
        _onMouseEnter: function(ev) {
            var self = this;
            clearTimeout(timeout);
            //$(this.selector).not(ev.currentTarget).popover('hide');
            timeout = setTimeout(function() {
                if (!self.$el.is(':hover') || $('.mycart-popover:visible').length) {
                    return;
                }
                $.get("/shop/cart", {
                    type: 'popover',
                }).then(function(data) {
                    $('.widget_shopping_cart_content').html(data)
                    self.$el.find('#cart_dropdown').addClass("show");
                });
            }, 100);
        },
        /**
         * @private
         * @param {Event} ev
         */
        _onMouseLeave: function(ev) {
            var self = this;
            self.$el.find('#cart_dropdown').removeClass("show");
            setTimeout(function() {
                if ($('.popover:hover').length) {
                    return;
                }
                if (!self.$el.is(':hover')) {
                    self.$el.popover('hide');
                }
            }, 1000);
        },
    });
});