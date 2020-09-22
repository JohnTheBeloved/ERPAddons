# -*- coding: utf-8 -*-
{
    'name': "Medicines",

    'summary': """
       For Categorization of Medicines based on generic names, use and medication. """,

    'description': """
         Module is specifically developed for Pharmacy Shops that use odoo
        as thier inventory Management System 
        to be able to use odoo to categorise drugs based on thier Generic Names and also 
       based on Pharmaceutical Classifications
    """,

    'author': "eHealth Informatics NG LTD",
    'website': "http://www.ehealthinformatics.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/12.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Specific Industry Applications',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': [
        'base',
        'product'
    ],

    # always loaded
    'data': [
        'security/ir.model.access.csv',
        'views/views.xml',
        'views/products.xml',
        'views/templates.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
}