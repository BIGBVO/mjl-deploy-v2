from django.urls import path

from .api import CreateEceranDailyReport

urlpatterns = [
  path('api/eceran-daily-report/create', CreateEceranDailyReport.as_view()),
]
