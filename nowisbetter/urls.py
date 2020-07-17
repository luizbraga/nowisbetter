from django.urls import path
from django.urls import include
from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView


urlpatterns = [
    path('', login_required(TemplateView.as_view(template_name='index.html'))),

    # path('accounts/', include('django.contrib.auth.urls')),
    path('accounts/', include('allauth.urls')),

    path('api/accounts/', include('accounts.api.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),

    path('api/tasks/', include('task.api.urls')),
    path('admin/', admin.site.urls),
]

admin.site.site_title = 'nowisbetter'
admin.site.site_header = 'nowisbetter'
