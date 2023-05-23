from django.urls import path, include
from knox import views as knox_views

from .api import CreateUserAPI, LoginAPI

urlpatterns = [
  path('api/auth/login', LoginAPI.as_view(), name='login'),
  path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
  path('api/auth/create', CreateUserAPI.as_view(), name='create_account')
]
