# -*- coding: utf-8 -*-
from odoo import http

# class RxshopFixes(http.Controller):
#     @http.route('/rxshop_fixes/rxshop_fixes/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/rxshop_fixes/rxshop_fixes/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('rxshop_fixes.listing', {
#             'root': '/rxshop_fixes/rxshop_fixes',
#             'objects': http.request.env['rxshop_fixes.rxshop_fixes'].search([]),
#         })

#     @http.route('/rxshop_fixes/rxshop_fixes/objects/<model("rxshop_fixes.rxshop_fixes"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('rxshop_fixes.object', {
#             'object': obj
#         })