from odoo import http

class WebsiteDiza(http.Controller):
    # @http.route('/website_utils/website_utils/', auth='public')
    # def index(self, **kw):
    #     return "Hello, world"

    # @http.route('/website_utils/website_utils/objects/', auth='public')
    # def list(self, **kw):
    #     return http.request.render('website_utils.listing', {
    #         'root': '/website_utils/website_utils',
    #         'objects': http.request.env['website_utils.website_utils'].search([]),
    #     })

    @http.route('/website_utils/website_utils/objects/<model("website_utils.website_utils"):obj>/', auth='public')
    def object(self, obj, **kw):
        return http.request.render('website_diza.object', {
            'object': obj
        })
