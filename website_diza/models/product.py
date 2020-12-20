# -*- coding: utf-8 -*-

from odoo import models, fields, api

class Product(models.Model):
    _inherit = "product.template"

    web_description = fields.Char(string='Website Description')

    def class_for(self, first):
      if first :
        return 'active'
      else:
        return ''



class ProductGroup(models.Model):
    _name = "website_diza.product_group"

    name = fields.Char(string='Group Name')
    query_id = fields.Char(string='Query ID')
    description = fields.Char(string='Description')
    product_ids = fields.Many2many('product.template', string="Product Lines")

    def first_class(self, first, className, other = ''):
      if first :
        return className
      else:
        return other

    def my_href(self):
      return self.name.lower().replace(" ", "_").replace("&", "and").replace("-", "_").replace(",", "")    
      
    def my_hash_href(self):
      return '#' + self.my_href()