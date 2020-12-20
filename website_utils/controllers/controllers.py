# -*- coding: utf-8 -*-
from addons_mine.website_utils.models.product import ProductGroup
from odoo.addons.portal.controllers.web import Home
from odoo.addons.website.controllers.main import QueryURL
from odoo import http
from odoo.http import request
import json
from werkzeug.exceptions import NotFound

class WebUtils(http.Controller):
    # @http.route('/web_utils/web_utils/', auth='public')
    # def index(self, **kw):
    #     return "Hello, world"

    # @http.route('/web_utils/web_utils/objects/', auth='public')
    # def list(self, **kw):
    #     return http.request.render('website_utils.listing', {
    #         'root': '/web_utils/web_utils',
    #         'objects': http.request.env['website_utils.web_utils'].search([]),
    #     })

    # @http.route('/web_utils/web_utils/objects/<model("website_utils.web_utils"):obj>/', auth='public')
    # def object(self, obj, **kw):
    #     return http.request.render('website_utils.object', {
    #         'object': obj
    #     })

    @http.route('/web_utils/product_group/<query_id>', auth='public', type="http", method=['GET'])
    def productGroup(self, **kw):
        query_id = kw.get('query_id')
        product_group = http.request.env['website_utils.product_group'].browse(['query_id', '=', query_id])
        return json.dumps({
            "products": product_group.product_ids
        })

class WebsiteSort(Home):
   @http.route()
   def index(self, **kw):
        super(WebsiteSort, self).index()
        featured_product_groups = request.env['website_utils.product_group'].search([('query_id', '=', 'featured')])
        last_chance_product_group = request.env['website_utils.product_group'].search([('query_id', '=', 'last-chance')])
        # category = request.env['product.public.category'].search([('id', '=', int(None))], limit=1)
        # if not category or not category.can_access_from_current_website():
        #     raise NotFound()
        attrib_list = request.httprequest.args.getlist('attrib')
        keep = QueryURL('/shop', False, search='', attrib=attrib_list, order=kw.get('order'))
        return request.render('website.homepage', {
            'featured_product_groups': featured_product_groups,
            'last_chance_product_group': last_chance_product_group,
            'keep': keep
        })