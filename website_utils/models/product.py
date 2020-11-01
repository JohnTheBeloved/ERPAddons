# -*- coding: utf-8 -*-

from odoo import models, fields, api

class Product(models.Model):
    _inherit = "product.template"

    web_description = fields.Char(string='Website Description')

    def class_for(self, active):
      if active :
        return 'active'
      else:
        return ''



class ProductGroup(models.Model):
    _name = "website_utils.product_group"

    group_name = fields.Char(string='Group Name')
    query_id = fields.Char(string='Query ID')
    description = fields.Char(string='Description')
    product_ids = fields.Many2many('product.product', string="Product Lines")
