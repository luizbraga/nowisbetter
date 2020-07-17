from django.contrib.admin import AdminSite
from django.contrib.admin import register as _register
from functools import partial


class DefaultAdminSite(AdminSite):
    site_title = 'nowisbetter'
    site_header = 'nowisbetter'
    index_title = 'Modules'


admin = DefaultAdminSite(name='nowisbetter')
register = partial(_register, site=admin)
