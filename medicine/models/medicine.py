# -*- coding: utf-8 -*-

from odoo import models, fields, api


class medicine(models.Model):
    _name = 'medicine.medicine'

    name = fields.Char()
    image_small = fields.Binary(string="Generic Picture (small)", readonly=False)
    generic_name = fields.Char()
    route = fields.Selection([
       ('oral', 'Oral (Tablet)'), ('sublingual', 'Disolves Under The Tongue(Tablet)'),
      ('rectal', 'Anus (Supositories)'), ('vaginal', 'Vaginal (Tablet)'), ('ocular', 'Eye Drop'),
      ('otic', 'Ear Drop'), ('nasal', 'Nasal Inhalation'), ('nebular', 'Nebularization'),
      ('cutaneous', 'Skin Cream/Ointment'), ('transdermal', 'Skip Patched'), 
      ('im', 'Intramuscular (Injection)'), ('intravenous', 'Intravenous (Injection)'),
    ])
    medication_class = fields.Char()
    description = fields.Text()
    is_controlled = fields.Boolean()
