from django.urls import path

from .api import CreatePengeluaran, GetPengeluaranByDate

urlpatterns = [
  path('api/pengeluaran/create', CreatePengeluaran.as_view()),
  path('api/pengeluaran/date', GetPengeluaranByDate.as_view()),
]
