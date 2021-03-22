from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [
    # url(r'', views.home, name="Home")
    path('', views.home, name="Home")
]