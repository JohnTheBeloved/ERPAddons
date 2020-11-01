# -*- coding: utf-8 -*-
from addons_mine.website_utils.models.product import ProductGroup
from odoo.addons.portal.controllers.web import Home
from odoo import http
from odoo.http import request
import json

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
       ProductGroupModel = request.env['website_utils.product_group']
       featured_product_group = ProductGroupModel.browse(['query_id', '=', 'featured'])
       return request.render('website.homepage', {
           'featured_product_group': featured_product_group
       })