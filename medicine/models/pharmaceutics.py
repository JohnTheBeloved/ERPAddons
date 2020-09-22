# -*- coding: utf-8 -*-

from odoo import models, fields, api


class pharmaceutics(models.Model):
    _name = 'medicine.medicine'

    name = fields.Char()
    compound_name = fields.Char()
    indications = fields.Char()
    contraindications = fields.Char()
    contraindications = fields.Char()
    pharmacology = fields.Text()
    dosage = fields.Char()
    chemical_constituents= fields.Text()