from django.urls import path, include
from knox import views as knox_views

from .api import GetAllTerminalName, GetSummary

urlpatterns = [
  path('api/terminal/all-name', GetAllTerminalName.as_view()),
  path('api/terminal/summary', GetSummary.as_view()),
]
