odoo.define('website_diza.add_to_cart', function(require) {
    "use strict";
    var Widget = require('web.Widget');
    var rpc = require('web.rpc');
    var ajax = require('web.ajax');
    var core = require('web.core');
    var sAnimations = require('website.content.snippets.animation');
    var qweb = core.qweb;
    var ProductConfiguratorMixin = require('sale.ProductConfiguratorMixin');

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


    sAnimations.registry.DizaSale = sAnimations.Class.extend(ProductConfiguratorMixin, {
        selector: '.product-quantity',
        events: {
            'click button.js_add_cart_json': 'onClickAddCartJSON',
            'change input.js_quantity': '_onChangeCartQuantity',
            'click a.js_delete_product': '_onClickDeleteProduct',
        },
        /**
         * Hack to add and remove from cart with json
         *
         * @param {MouseEvent} ev
         */
        onClickAddCartJSON: function(ev) {
            ev.preventDefault();
            var $link = $(ev.currentTarget);
            console.log({ $link })
            var $input = $link.closest('.input-group').find("input");
            var min = parseFloat($input.data("min") || 0);
            var max = parseFloat($input.data("max") || Infinity);
            var quantity = ($link.has(".tb-icon-minus").length ? -1 : 1) + parseFloat($input.val() || 0, 10);
            var newQty = quantity > min ? (quantity < max ? quantity : max) : min;
            $input.val(newQty).trigger('change');
            return false;
        },
        _onChangeCartQuantity: function(ev) {
            var $input = $(ev.currentTarget);
            if ($input.data('update_change')) {
                return;
            }
            var value = parseInt($input.val() || 0, 10);
            if (isNaN(value)) {
                value = 1;
            }
            var $dom = $input.closest('tr');
            // var default_price = parseFloat($dom.find('.text-danger > span.oe_currency_value').text());
            var $dom_optional = $dom.nextUntil(':not(.optional_product.info)');
            var line_id = parseInt($input.data('line-id'), 10);
            var productIDs = [parseInt($input.data('product-id'), 10)];
            console.log({ $input, value, $dom_optional, line_id, productIDs })
            this._updateCartQuantity($input, value, $dom_optional, line_id, productIDs);
        },
        _updateCartQuantity: function($input, value, $dom_optional, line_id, productIDs) {
            _.each($dom_optional, function(elem) {
                $(elem).find('.js_quantity').text(value);
                productIDs.push($(elem).find('span[data-product-id]').data('product-id'));
            });
            $input.data('update_change', true);

            this._rpc({
                route: "/shop/cart/update_json",
                params: {
                    line_id: line_id,
                    product_id: parseInt($input.data('product-id'), 10),
                    set_qty: value
                },
            }).then(function(data) {
                $input.data('update_change', false);
                var check_value = parseInt($input.val() || 0, 10);
                if (isNaN(check_value)) {
                    check_value = 1;
                }
                if (value !== check_value) {
                    $input.trigger('change');
                    return;
                }
                var $q = $(".my_cart_quantity");
                if (data.cart_quantity) {
                    $q.parents('li:first').removeClass('d-none');
                } else {
                    window.location = '/shop/cart';
                }

                $q.html(data.cart_quantity).hide().fadeIn(600);
                $input.val(data.quantity);
                $('.mini-cart-items').html(data.cart_quantity)
                $('.cart-total  .oe_currency_value').html(data.cart_total)

                $('.js_quantity[data-line-id=' + line_id + ']').val(data.quantity).html(data.quantity);
                $('.product-subtotal[data-line-id=' + line_id + '] .oe_currency_value').html(data.line_total);

                //Removes entire cart lines - maybe this is best
                // $(".js_cart_lines").first().before(data['website_sale.cart_lines']).end().remove();
                // $(".js_cart_summary").first().before(data['website_sale.short_cart_summary']).end().remove();

                if (data.warning) {
                    var cart_alert = $('.oe_cart').parent().find('#data_warning');
                    if (cart_alert.length === 0) {
                        $('.oe_cart').prepend('<div class="alert alert-danger alert-dismissable" role="alert" id="data_warning">' +
                            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> ' + data.warning + '</div>');
                    } else {
                        cart_alert.html('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> ' + data.warning);
                    }
                    $input.val(data.quantity);
                }
            });
        },
        _onClickDeleteProduct: function(ev) {
            console.log({ ev })
            ev.preventDefault();
            $(ev.currentTarget).closest('tr').find('.js_quantity').val(0).trigger('change');
        },
    });


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