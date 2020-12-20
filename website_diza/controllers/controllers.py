# -*- coding: utf-8 -*-
from addons_mine.website_diza.models.product import ProductGroup
from odoo.addons.portal.controllers.web import Home
from odoo.addons.website_sale.controllers.main import WebsiteSale
from odoo.addons.website.controllers.main import QueryURL
from odoo import fields, http
from odoo.http import request
import json
from werkzeug.exceptions import NotFound

class WebsiteDizaHome(Home):
   @http.route()
   def index(self, **kw):
        super(WebsiteDizaHome, self).index()
        cart_response = {}#self.cart()
        featured_product_groups = request.env['website_diza.product_group'].search([('query_id', '=', 'featured')])
        last_chance_product_group = request.env['website_diza.product_group'].search([('query_id', '=', 'last-chance')])
        attrib_list = request.httprequest.args.getlist('attrib')
        keep = QueryURL('/shop', False, search='', attrib=attrib_list, order=kw.get('order'))
        return request.render('website.homepage', {
            'featured_product_groups': featured_product_groups,
            'last_chance_product_group': last_chance_product_group,
            'keep': keep,
            **cart_response
        })

   def cart(self, access_token=None, revive='', **post):
        """
        Main cart management + abandoned cart revival
        access_token: Abandoned cart SO access token
        revive: Revival method when abandoned cart. Can be 'merge' or 'squash'
        """
        order = request.website.sale_get_order()
        if order and order.state != 'draft':
            request.session['sale_order_id'] = None
            order = request.website.sale_get_order()
        values = {}
        if access_token:
            abandoned_order = request.env['sale.order'].sudo().search([('access_token', '=', access_token)], limit=1)
            if not abandoned_order:  # wrong token (or SO has been deleted)
                return request.render('website.404')
            if abandoned_order.state != 'draft':  # abandoned cart already finished
                values.update({'abandoned_proceed': True})
            elif revive == 'squash' or (revive == 'merge' and not request.session['sale_order_id']):  # restore old cart or merge with unexistant
                request.session['sale_order_id'] = abandoned_order.id
                return request.redirect('/shop/cart')
            elif revive == 'merge':
                abandoned_order.order_line.write({'order_id': request.session['sale_order_id']})
                abandoned_order.action_cancel()
            elif abandoned_order.id != request.session['sale_order_id']:  # abandoned cart found, user have to choose what to do
                values.update({'access_token': abandoned_order.access_token})

        if order:
            from_currency = order.company_id.currency_id
            to_currency = order.pricelist_id.currency_id
            compute_currency = lambda price: from_currency._convert(
                price, to_currency, request.env.user.company_id, fields.Date.today())
        else:
            compute_currency = lambda price: price

        values.update({
            'website_sale_order': order,
            'compute_currency': compute_currency,
            'date': fields.Date.today(),
            'suggested_products': [],
        })
        if order:
            _order = order
            if not request.env.context.get('pricelist'):
                _order = order.with_context(pricelist=order.pricelist_id.id)
            values['suggested_products'] = _order._cart_accessories()

        return values


class WebsiteDizaSale(WebsiteSale):
   @http.route('/shop/cart')
   def cart(self, access_token=None, revive='', **post):
        response = super(WebsiteDizaSale, self).cart()
        if post.get('type') == 'popover':
            # force no-cache so IE11 doesn't cache this XHR
            return request.render("website_diza.cart_popover", response.qcontext, headers={'Cache-Control': 'no-cache'})
        return response

    
   @http.route(['/shop/product6/<model("product.template"):product>'], type='http', auth="public", website=True)
   def product2(self, product, category='', search='', **kwargs):
        #response = super(WebsiteDizaSale, self).product(product)
        website = request.env['website'].get_current_website()
        return request.render("website_diza.product_quickview", {'product': product, 'website': website}, headers={'Cache-Control': 'no-cache'})



#     @http.route(['/shop/cart/update_post'], type='json', auth="public", methods=['POST'], website=True, csrf=False)
#     def cart_update_post(self, product_id, add_qty=1, set_qty=0, **kw):
#         print("Yea, It works")
#         """This route is called when adding a product to cart (no options)."""
#         sale_order = request.website.sale_get_order(force_create=True)
#         if sale_order.state != 'draft':
#             request.session['sale_order_id'] = None
#             sale_order = request.website.sale_get_order(force_create=True)

#         product_custom_attribute_values = None
#         if kw.get('product_custom_attribute_values'):
#             product_custom_attribute_values = json.loads(kw.get('product_custom_attribute_values'))

#         no_variant_attribute_values = None
#         if kw.get('no_variant_attribute_values'):
#             no_variant_attribute_values = json.loads(kw.get('no_variant_attribute_values'))

#         values = sale_order._cart_update(
#             product_id=int(product_id),
#             add_qty=add_qty,
#             set_qty=set_qty,
#             product_custom_attribute_values=product_custom_attribute_values,
#             no_variant_attribute_values=no_variant_attribute_values
#         )
#         return values
