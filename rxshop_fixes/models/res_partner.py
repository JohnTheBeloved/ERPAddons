# -*- coding: utf-8 -*-

from odoo import models, fields, api

class ResPartner(models.Model):
    _inherit = 'res.partner'

# This fixes the 
# error(There is no receivable account defined to make payment for the partner: "Delete32" (id:188).) 
# while creating an order for a new customer on the POS UI 
#TODO: create ui to choose default customer and payable receivable account 
    @api.model
    def create_from_ui(self, partner):
        partner['property_account_receivable_id'] = 45
        partner['property_account_payable_id'] = 46
        super().create_from_ui(partner)