odoo.define('diza.chatter', function(require) {
    'use strict';

    var base = require('web_editor.base');
    var ajax = require('web.ajax');
    var core = require('web.core');
    var dom = require('web.dom');
    var Widget = require('web.Widget');
    var rpc = require('web.rpc');
    var time = require('web.time');

    var qweb = core.qweb;
    var _t = core._t;

    /**
     * Widget PortalChatter
     *
     * - Fetch message fron controller
     * - Display chatter: pager, total message, composer (according to access right)
     * - Provider API to filter displayed messages
     */
    var DizaChatter = Widget.extend({
        template: 'diza.chatter',
        events: {
            "click .o_portal_chatter_pager_btn": '_onClickPager',
            'click .o_portal_chatter_composer_btn': '_onSubmitButtonClick',
        },

        init: function(parent, options) {
            this._super.apply(this, arguments);
            this.options = _.defaults(options || {}, {
                'allow_composer': true,
                'display_composer': false,
                'csrf_token': odoo.csrf_token,
                'message_count': 0,
                'pager_step': 10,
                'pager_scope': 5,
                'pager_start': 1,
                'is_user_public': true,
                'is_user_publisher': false,
                'domain': [],
                'display_rating': true,
                'rating_default_value': 0.0,
            });
            this.set('rating_width', 'width:50%');
            this.set('no_of_customers', 'width:50%');
        },
        willStart: function() {
            var self = this;
            // load qweb template and init data
            return $.when(
                rpc.query({
                    route: '/mail/chatter_init',
                    params: this._messageFetchPrepareParams()
                }), this._loadTemplates()
            ).then(function(result) {
                console.log(232, { result })
                self.result = result;
                var rating_data = {
                    'avg': self.round_to_half(result['rating_stats']['avg']),
                    'percent': [],
                };
                self.set('rating_avg', rating_data['avg']);
                self.set('rating_width', 'width:' + (rating_data['avg'] * 2 * 10) + '%');
                self.set('no_of_ratings', result['rating_stats']['total']);
                self.options = _.extend(self.options, self.result['options'] || {});
                return result;
            });
        },
        /**
         * @override
         */
        start: function() {
            // bind events
            this.on("change:rating_width", this, this._renderRating);
            return this._super.apply(this, arguments);
        },

        _loadTemplates: function() {
            return ajax.loadXML('/website_diza/static/src/xml/diza_chatter.xml', qweb);
        },
        _messageFetchPrepareParams: function() {
            var self = this;
            var data = {
                'res_model': this.options['res_model'],
                'res_id': this.options['res_id'],
                'limit': this.options['pager_step'],
                'offset': (this._current_page - 1) * this.options['pager_step'],
                'allow_composer': this.options['allow_composer'],
            };
            // add token field to allow to post comment without being logged
            if (self.options['token']) {
                data['token'] = self.options['token'];
            }
            // add domain
            if (this.get('domain')) {
                data['domain'] = this.get('domain');
            }
            if (this.options['display_rating']) {
                data['rating_include'] = true;
            }
            return data;
        },
        _renderRating: function() {
            this.$('.star-rating').replaceWith(qweb.render("diza.chatter", { widget: this }));
        },
        _renderCustomers: function() {

        },
        /**
         * Round the given value with a precision of 0.5.
         *
         * Examples:
         * - 1.2 --> 1.0
         * - 1.7 --> 1.5
         * - 1.9 --> 2.0
         *
         * @param {Number} value
         * @returns Number
         **/
        round_to_half: function(value) {
            var converted = parseFloat(value); // Make sure we have a number
            var decimal = (converted - parseInt(converted, 10));
            decimal = Math.round(decimal * 10);
            if (decimal === 5) {
                return (parseInt(converted, 10) + 0.5);
            }
            if ((decimal < 3) || (decimal > 7)) {
                return Math.round(converted);
            } else {
                return (parseInt(converted, 10) + 0.5);
            }
        },

    });

    base.ready().then(function() {
        $('.woocommerce-product-rating').each(function(index) {
            var $elem = $(this);
            var starRating = $elem.find('.star-rating');
            if (starRating) {
                starRating.remove()
            }
            var mail_thread = new DizaChatter(null, $elem.data());
            mail_thread.prependTo($elem);
        });
    });

    return {
        DizaChatter: DizaChatter,
    };

});


