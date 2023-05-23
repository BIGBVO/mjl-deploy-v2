from django.urls import path

from .api import CreateEceranTransfer, GetEceranTransferByDate

urlpatterns = [
  path('api/eceran-transfer/create', CreateEceranTransfer.as_view()),
  path('api/eceran-transfer/date', GetEceranTransferByDate.as_view()),
]
