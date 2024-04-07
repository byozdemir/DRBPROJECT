from django.urls import re_path,path

from . import views

urlpatterns = [
    path('signup', views.signup),
    path('login', views.login),
    path('test_token', views.test_token),
    path('userdetail/<int:pk>', views.userDetail),
]