# -*- coding: utf-8 -*-

from odoo import models, fields, api

class Product(models.Model):
    _inherit = "product.template"

    is_medicine = fields.Boolean(string='Medicine?')
    medicine_id = fields.Many2one(
        'medicine.medicine', string='Medicine', help="This Medicine is the common name of this Product.")
  